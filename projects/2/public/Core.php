<?php

/**
 * @return object{clientId: string, secret: string, redirect_uri: string}
 */
function googleSettings(): object
{
    return (object) [
        'clientId'     => '448775749219-17cto7pu938ik49avu9m2sqh7fs44mko.apps.googleusercontent.com',
        'secret'       => 'YOUR_GOOGLE_CLIENT_SECRET',
        'redirect_uri' => '#'
    ];
}

/**
 * @throws JsonException
 */
function executeRoutes(array $packs, Route $userRoute): void
{
    $used = false;
    foreach ($packs as $pack) {
        /**
         * @var Pack $pack
         */
        if (!$userRoute->isSame($pack->route)) {
            continue;
        }

        ($pack->closure)();
        $used = true;
        break;
    }

    if (!$used) {
        // Fallback for .php extension in case routing mismatch
        jsonResponse(404, ['Not Found']);
    }
}

final class Pack
{
    /** @var Route */
    public $route;
    /** @var Closure */
    public $closure;

    private function __construct(
        Route $route,
        Closure $closure
    ) {
        $this->route = $route;
        $this->closure = $closure;
    }

    public static function new(
        Route $route,
        Closure $closure
    ) {
        return new self($route, $closure);
    }
}

final class Route
{
    /** @var string */
    public $path;
    /** @var string */
    public $method;

    public function __construct(
        string $path,
        string $method
    ) {
        $path = parse_url($path, PHP_URL_PATH);
        // Remove .php extension if present
        if (substr($path, -4) === '.php') {
            $path = substr($path, 0, -4);
        }
        $this->path = trim($path, '/');
        $this->method = mb_strtolower($method);
    }

    public static function create(array $request)
    {
        return new Route(
            $request['REQUEST_URI'],
            $request['REQUEST_METHOD']
        );
    }

    public function isSame(Route $route)
    {
        return $this->path === $route->path
            && $this->method === $route->method;
    }
}

/**
 * @throws JsonException
 */
function jsonResponse(int $status, array $body = null): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');

    if ($body === null) {
        echo json_encode(new stdClass(), JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    } else {
        echo json_encode($body, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}

function createJWT(int $userId): string
{
    $header = [
        'alg' => 'HS256',
        'typ' => 'JWT'
    ];

    $payload = [
        'sub' => $userId,
        'iat' => time(),
        'exp' => time() + 36000 // истекает через 10 часов
    ];

    $base64Header  = base64UrlEncode(json_encode($header));
    $base64Payload = base64UrlEncode(json_encode($payload));

    $secret = "YOUR_JWT_SECRET";
    $signature = hash_hmac('sha256', "$base64Header.$base64Payload", $secret, true);
    $base64Signature = base64UrlEncode($signature);

    return sprintf('%s.%s.%s', $base64Header, $base64Payload, $base64Signature);
}

function base64UrlEncode(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function getJWTUserId(string $jwt): int
{
    if ($jwt === '') {
        throw new RuntimeException('Missing authorization token');
    }

    $secret = "YOUR_JWT_SECRET";

    // Разбиваем токен
    $parts = explode('.', $jwt);
    if (count($parts) !== 3) {
        throw new RuntimeException("Invalid JWT format");
    }

    [$base64Header, $base64Payload, $base64Signature] = $parts;

    $expectedSig = base64UrlEncode(
        hash_hmac('sha256', "$base64Header.$base64Payload", $secret, true)
    );

    if (!hash_equals($expectedSig, $base64Signature)) {
        throw new RuntimeException("Invalid JWT signature");
    }

    $payload = base64UrlDecode($base64Payload);

    if (isset($payload['exp']) && $payload['exp'] < time()) {
        throw new RuntimeException("JWT expired");
    }

    return (int)($payload['sub'] ?? 0);
}

function base64UrlDecode(string $payload): ?array
{
    $base64 = strtr($payload, '-_', '+/');
    $json = base64_decode($base64);
    return json_decode($json, true);
}

function ensureSQLite(object $settings): SQLite3
{
    if (!extension_loaded('sqlite3')) {
        throw new RuntimeException("PHP extension 'sqlite3' is not loaded");
    }

    $path = $settings->path ?? (__DIR__ . '/storage/app.sqlite');
    $dir  = dirname($path);

    if (!is_dir($dir) && !mkdir($dir, 0775, true) && !is_dir($dir)) {
        throw new RuntimeException("Failed to create directory '$dir'");
    }

    $isNew = !file_exists($path);

    $db = new SQLite3($path, SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);

    $db->busyTimeout($settings->busy_timeout_ms ?? 5000);
    $db->exec('PRAGMA foreign_keys = ON');
    $db->exec('PRAGMA journal_mode = WAL');

    if (
        $isNew &&
        !empty($settings->init_sql) &&
        !(bool) $db->exec($settings->init_sql)
    ) {
        throw new RuntimeException("Failed to initialize database: " . $db->lastErrorMsg());
    }

    return $db;
}

// RouteAttr and definedRoutes removed for PHP 7.3 compatibility

function databaseSettings()
{
    return (object) [
        'path'            => __DIR__ . '/storage/app.sqlite',
        'busy_timeout_ms' => 5000,
        'init_sql'        => '
            CREATE TABLE IF NOT EXISTS users (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                name       TEXT NOT NULL,
                email      TEXT NOT NULL,
                google_id  TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                group_id   INTEGER,
                text       TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id    INTEGER,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS news (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                name       TEXT NOT NULL,
                new_text   TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ',
    ];
}

function DB(): SQLite3
{
    return ensureSQLite(databaseSettings());
}
