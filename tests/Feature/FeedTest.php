<?php

declare(strict_types=1);

test('sitemap xml generates valid xml structure and contains URLs', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'application/xml; charset=utf-8');

    $content = $response->getContent();
    expect($content)->toContain('<urlset')
        ->toContain('<loc>')
        ->toContain('/percentage-calculator')
        ->toContain('/blog/age-calculator-guide');
});

test('robots txt allows crawlers and points to sitemap', function () {
    $response = $this->get('/robots.txt');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'text/plain; charset=utf-8');

    $content = $response->getContent();
    expect($content)->toContain('User-agent: *')
        ->toContain('User-agent: GPTBot')
        ->toContain('User-agent: ClaudeBot')
        ->toContain('Sitemap:')
        ->toContain('/sitemap.xml');
});

test('rss xml generates valid rss 2.0 feed', function () {
    $response = $this->get('/rss.xml');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'application/rss+xml; charset=utf-8');

    $content = $response->getContent();
    expect($content)->toContain('<rss version="2.0"')
        ->toContain('<channel>')
        ->toContain('<title>Tool4SaaS Blog')
        ->toContain('<item>');
});

test('manifest webmanifest returns valid json', function () {
    $response = $this->get('/manifest.webmanifest');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'application/manifest+json; charset=utf-8');
    $response->assertJsonPath('name', 'Tool4SaaS');
});

test('llms txt returns markdown summary', function () {
    $response = $this->get('/llms.txt');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'text/plain; charset=utf-8');

    $content = $response->getContent();
    expect($content)->toContain('# Tool4SaaS')
        ->toContain('## Overview')
        ->toContain('## Calculators');
});

test('dynamic open graph image generates valid png', function () {
    $response = $this->get('/og/percentage-calculator.png');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'image/png');
    expect(strlen($response->getContent()))->toBeGreaterThan(1000);
});

test('dynamic blog og image generates valid png', function () {
    $response = $this->get('/og/blog/age-calculator-guide.png');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'image/png');
    expect(strlen($response->getContent()))->toBeGreaterThan(1000);
});
