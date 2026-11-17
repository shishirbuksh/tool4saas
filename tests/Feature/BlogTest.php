<?php

declare(strict_types=1);

test('blog index renders pillars and sections', function () {
    $response = $this->get('/blog');

    $response->assertStatus(200);
    $response->assertSee('Guides &amp; Tutorials', false);
    $response->assertSee('Age Calculator Guide');
});

test('blog pillar page renders full post and cluster list', function () {
    $response = $this->get('/blog/age-calculator-guide');

    $response->assertStatus(200);
    $response->assertSee('Age Calculator Guide');
    $response->assertSee('Why date math goes wrong');
    $response->assertSee('Frequently Asked Questions');
});

test('blog cluster page renders article and related links', function () {
    $response = $this->get('/blog/age-calculator-guide/how-to-calculate-age');

    $response->assertStatus(200);
    $response->assertSee('How to Calculate Exact Age');
    $response->assertSee('Related Tutorials');
});

test('blog cluster with preset scenario renders deep-link cta', function () {
    $response = $this->get('/blog/sip-calculator-guide/sip-5000-10-years');

    $response->assertStatus(200);
    $response->assertSee('/sip-calculator?monthly=5000&amp;years=10&amp;rate=12&amp;currency=₹', false);
    $response->assertSee('Calculate This Scenario Live →');
});

test('non-existent blog pillar returns 404', function () {
    $response = $this->get('/blog/non-existent-guide-xyz');

    $response->assertStatus(404);
});
