<?php
/**
 * Ensures that a given domain URL has a valid scheme (http or https).
 *
 * @param string $domain The domain URL to be validated.
 * @return string The domain URL with a valid scheme.
 */
if (! function_exists('fullUrl')) {
    function fullUrl($domain) {
        // Ensure the URL has a scheme
        if (!preg_match('~^(http|https)://~i', $domain)) {
            $domain = 'https://' . $domain;
        }
        return $domain;
    }
}
