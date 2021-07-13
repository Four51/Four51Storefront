<?php

// Requires lftp (apt-get install lftp)
// Place this script in the root of your Four51 application (next to index.html) 
// Set APP to the Four51 application folder, add your Four51 username and password
// Run the script once to generate its internal file listing, run it subsequent times to upload modified files
// Script only supports uploading modified files, not folders

const APP = 'KindredStorefront';
const FOUR51USER = 'brian.hartvigsen';
const FOUR51PASS = 'JBL3hj2bdjh2vghv21gvw';

function walkFolders($dir, &$results = []) {
	$files = scandir($dir);
	foreach ($files as $key => $value) {
		if (strpos($value, 'filemtimes.json') !== false || strpos($value, 'deploy.php') !== false || strpos($value, '.') === 0) {
			continue;
		}
		$path = realpath($dir . DIRECTORY_SEPARATOR . $value);
		if (!is_dir($path)) {
			$results[] = $path;
		} else if ($value != "." && $value != "..") {
			walkFolders($path, $results);
			$results[] = $path;
		}
	}
	return $results;
}

$fileMtimes = json_decode(@file_get_contents('./filemtimes.json'));

$folderContents = walkFolders('.');
$folderData = [];
foreach ($folderContents as $item) {
	$folderData[$item] = filemtime($item);
}

if (!$fileMtimes) {
	// Generate new list
	echo "\033[32mNo history found, generating...\033[0m\n";
	file_put_contents('./filemtimes.json', json_encode($folderData));
} else {
	// Compare file modified times against existing list
	$changedFiles = [];
	foreach ($fileMtimes as $item => $mtime) {
		if (!isset($folderData[$item]) || is_dir($item)) {
			continue;
		}
		if ($folderData[$item] != $mtime) {
			// File has changed, add to list
			$changedFiles[$item] = $mtime;
		}
	}
	if (count($changedFiles)) {
		// Deploy file(s)
		foreach ($changedFiles as $item => $mtime) {
			echo "\033[32mUploading: $item\033[0m\n";
			exec('lftp -e "set ftp:ssl-protect-data true set ftp:ssl-force true set ssl:verify-certificate no; put ' . $item . ' -o ./' . APP . '/app' . str_replace(getcwd(), '', $item) . '; quit" -u testSPA\|' . FOUR51USER . ',' . FOUR51PASS . ' ftp://appFTP.four51.com');
		}
		file_put_contents('./filemtimes.json', json_encode($folderData));
		if (count($changedFiles) == 1) {
			echo 'Uploaded ' . count($changedFiles) . " file\n";
		} else {
			echo 'Uploaded ' . count($changedFiles) . " files\n";
		}
	} else {
		echo "\033[33mNo files to update!\033[0m\n";
	}
}
