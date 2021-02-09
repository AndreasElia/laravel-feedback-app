<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Site;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FeedbackTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_feedback_can_be_added()
    {
        $site = Site::factory()->create();

        $response = $this->post(sprintf('/api/feedback?key=%s', $site->key), [
            'message' => 'Message',
        ]);

        $response->assertSuccessful();
    }
}
