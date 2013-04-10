<?php

// get the correct versions of sencha touch f	

// default to the latest release version - 2.1.0
$version = '210';

// chec for override
if (isset($_GET['version'])) {
	$version = $_GET['version'];
}

// sencha cdn urls
$jsTpl = 'http://cdn.sencha.io/touch/sencha-touch-%s/sencha-touch-all.js';
$cssTpl = 'http://cdn.sencha.io/touch/sencha-touch-%s/resources/css/sencha-touch.css';

// generate js and css urls
switch ($version) {
	// 2.2 release candidate
	case '220rc':
		$js = '2.2rc/sencha-touch-all.js';
		$css = '2.2rc/sencha-touch.css';
		break;
	// 2.1.0
	case '210':
		$js = sprintf($jsTpl, '2.1.0');
		$css = sprintf($cssTpl, '2.1.0');
		break;
	// 2.0.1
	case '201':
		$js = sprintf($jsTpl, '2.0.1');
		$css = sprintf($cssTpl, '2.0.1');
		break;
	// 2.0.0
	case '200':
		$js = sprintf($jsTpl, '2.0.0');
		$css = sprintf($cssTpl, '2.0.0');
		break;
}
?>
<!DOCTYPE HTML>
<html manifest="" lang="en-US">
<head>
    <meta charset="UTF-8">
    
    <title>Test</title>
    
    <link href="<?php echo $css; ?>" rel="stylesheet" />
	<script src="<?php echo $js; ?>"></script>
	<script src="app.js"></script>
    
</head>
<body>



</body>
</html>
