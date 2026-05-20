<?php

final class GptResponse
{
    /** @var string */
    public $message;
    /** @var string */
    public $id;
    /** @var string */
    public $model;
    /** @var array */
    public $choices;
    /** @var array */
    public $usage;

    public function __construct(
        string $message,
        string $id,
        string $model,
        array $choices,
        array $usage
    ) {
        $this->message = $message;
        $this->id = $id;
        $this->model = $model;
        $this->choices = $choices;
        $this->usage = $usage;
    }
}

final class ChatGPT
{
    /** @var string */
    private $prompt;
    /** @var Closure|null */
    private $closure;
    /** @var string */
    private $token;
    /** @var int */
    private $maxRetryPerRequest;

    public function __construct(
        string $token,
        int $maxRetryPerRequest = 5
    ) {
        $this->token = $token;
        $this->maxRetryPerRequest = $maxRetryPerRequest;
    }

    public function setPrompt(string $prompt): self
    {
        $this->prompt = $prompt;

        return $this;
    }

    public function setValidationCallback(Closure $closure): self
    {
        $this->closure = $closure;

        return $this;
    }

    public function request(string $model = 'gpt-4o-mini'): GptResponse
    {
        $currentTryCount = 0;

        $errors = [];

        while ($currentTryCount < $this->maxRetryPerRequest) {
            ++$currentTryCount;

            try {
                $response = $this->callOpenAi($model);

                if ($response === false) { throw new RuntimeException('Response is false'); }

                $response = json_decode(
                    $response,
                    true,
                    512,
                    JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR
                );

                $content = $response['choices'][0]['message']['content'];

                if ($this->closure !== null && ($this->closure)($content) === false) { throw new RuntimeException('Not valid by callbacks'); }

                return new GptResponse(
                    $content,
                    $response['id'],
                    $response['model'],
                    $response['choices'],
                    $response['usage']
                );
            } catch (Throwable $e) {
                $errors[] = $e->getMessage();
            }

            sleep(1);
        }

        throw new RuntimeException('Too many attempts invoke OpenAi Api, try later or contact help.' . PHP_EOL . 'List of errors: ' . PHP_EOL . implode(PHP_EOL . "\t\n", $errors) );
    }

    /**
     * @return string|false
     * @throws JsonException
     */
    private function callOpenAi(string $model)
    {
        $apiUrl = 'https://api.openai.com/v1/chat/completions';

        $postData = [
            'model' => $model,
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $this->prompt
                ]
            ],
        ];

        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->token,
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'Ошибка cURL: ' . curl_error($ch) . PHP_EOL;
            curl_close($ch);
            return false;
        }

        curl_close($ch);

        $jsonResponse = json_decode($response, true, 512, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
        if (($jsonResponse['error'] ?? null) !== null) {
            echo 'Ошибка cURL: ' . json_encode($jsonResponse['error'], JSON_PRETTY_PRINT) . PHP_EOL;
            return false;
        }

        return $response;
    }
}