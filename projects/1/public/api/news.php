<?php

include_once dirname(__DIR__) . '/Core.php';
include_once dirname(__DIR__) . '/ChatGPT.php';

$userRoute = Route::create($_SERVER);

$routes = [
    Pack::new(new Route('api/news.php', 'get'), function() { showNews(); })
];

executeRoutes($routes, $userRoute);

/**
 * @throws JsonException
 */
function showNews(): void
{
    try {
        tryCreateNew('English', true);

        $query = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_QUERY) ?? '';
        parse_str($query, $params);
        $page = isset($params['page']) ? max(1, (int)$params['page']) : 1;

        $sqlShowNews = '
        SELECT 
            r.name             AS name,
            r.new_text         AS new_text,
            r.created_at       AS created_at
        FROM news r
        ORDER BY r.created_at DESC
        LIMIT 3 OFFSET '. ($page - 1) * 3 .';
        ';

        $db = DB();

        $res = $db->query($sqlShowNews);

        if ($res === false) {
            throw new RuntimeException('SQLite error: ' . $db->lastErrorMsg());
        }

        $news = [];
        while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
            $news[] = $row;
        }

        foreach ($news as $i => $new) {
            $newText = explode("\n", $new['new_text']);
            $news[$i]['new_text'] = array_values(array_filter($newText));
        }

        jsonResponse(200, [
            'news' => $news,
            'hasNext' => (int) $db->query('SELECT COUNT(*) FROM news')->fetchArray(SQLITE3_NUM)[0] > $page * 3,
        ]);
    } catch (RuntimeException $e) {
        jsonResponse(400, ['error' => $e->getMessage()]);
    } catch (Throwable $e) {
        jsonResponse(500, ['error' => 'Critical error ' . $e->getLine() . ' - ' . $e->getMessage()]);
    }
}

function tryCreateNew(string $language, bool $postAlways = false): void
{
    $GptToken = 'YOUR_OPENAI_API_KEY';
    $GptPrompt = '
    You are an expert copywriter and gaming journalist.

    Your task is to write a short article about gaming topics in '. $language .'.

    IMPORTANT:
    - Write ONLY in English.
    - Do NOT use English words or phrases.
    - The title and content must be in English.

    Requirements:

    - The entire output must be a single, raw JSON object, without any surrounding markdown like ```json or ```.

    - The JSON object must have the following structure:
    {
      "name": "...",
      "content": "..."
    }

    - The name field must contain a unique and creative title in English.

    - The content field must contain the text of the article in English and must follow these rules:

    - Structure: 2 paragraphs, around 80–120 words in total.

    - Style: engaging, conversational, slightly journalistic, suitable for an online gaming blog.

    - Originality: The article must sound natural and human-written, not repetitive.

    - Content: Use relevant gaming terminology and examples.

    - Conciseness: Avoid generic filler sentences — every sentence should add value.

    - Formatting: No lists, no bullet points — only narrative paragraphs.

    - Topic: gaming themes, trends, or culture — popular games, new releases, eSports, gaming communities, or gaming history.
    ';

    $todayDayOfWeek = (int)date('N');
    if ($postAlways || in_array($todayDayOfWeek, [3, 5])) {

        $db = DB();

        $startOfDay = date('Y-m-d 00:00:00');
        $endOfDay = date('Y-m-d 23:59:59');

        $stmt = $db->prepare('SELECT COUNT(*) FROM news WHERE created_at BETWEEN :start AND :end');
        $stmt->bindValue(':start', $startOfDay, SQLITE3_TEXT);
        $stmt->bindValue(':end', $endOfDay, SQLITE3_TEXT);
        $result = $stmt->execute();

        $postCountToday = ($result) ? (int)$result->fetchArray(SQLITE3_NUM)[0] : 0;

        // 3. Если сегодня не было новостей, генерируем и публикуем
        if ($postCountToday === 0) {
            // Эти переменные должны быть определены в вашем конфигурационном файле

            $gpt = new ChatGPT($GptToken);

            $gpt
                ->setValidationCallback(function($response) {
                    if (empty($response)) return false;
                    $data = json_decode($response);
                    return mb_strlen($response) >= 60
                        && mb_strlen($response) <= 3000
                        && strpos($response, '```') === false
                        && $data !== false
                        && $data !== null
                        && isset($data->name)
                        && isset($data->content);
                })
                ->setPrompt($GptPrompt);

            $gptResponse = $gpt->request();

            if ($gptResponse && !empty($gptResponse->message)) {
                $newPost = json_decode($gptResponse->message, true, 512, JSON_UNESCAPED_UNICODE);

                if (is_array($newPost) && isset($newPost['name'], $newPost['content'])) {
                    $insertStmt = $db->prepare(
                        'INSERT INTO news (name, new_text, created_at) VALUES (:name, :text, datetime(\'now\', \'localtime\'))'
                    );
                    $insertStmt->bindValue(':name', $newPost['name'], SQLITE3_TEXT);
                    $insertStmt->bindValue(':text', $newPost['content'], SQLITE3_TEXT);
                    $insertStmt->execute();
                }
            }
        }
    }
}

