<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Sanitize inputs
function clean($val) {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$firstName = clean($_POST['first_name'] ?? '');
$lastName  = clean($_POST['last_name'] ?? '');
$phone     = clean($_POST['phone'] ?? '');
$email     = clean($_POST['email'] ?? '');
$service   = clean($_POST['service'] ?? '');
$financing = clean($_POST['financing'] ?? '');
$message   = clean($_POST['message'] ?? '');

// Basic validation
if (!$firstName || !$phone) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$to      = 'moeshop@yahoo.com';
$subject = $financing
  ? "New Financing Application ({$financing}) — Moe Body Shop"
  : 'New Estimate Request — Moe Body Shop';

$type  = $financing ? 'Financing Application' : 'Estimate Request';
$body  = "New {$type} from the website:\n\n";
$body .= "Name:    {$firstName} {$lastName}\n";
$body .= "Phone:   {$phone}\n";
$body .= "Email:   {$email}\n";
if ($financing) $body .= "Financing: {$financing}\n";
if ($service)   $body .= "Service:   {$service}\n";
if ($message)   $body .= "\nMessage:\n{$message}\n";

$headers  = "From: noreply@moebodyshop.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not send message. Please call us directly.']);
}
