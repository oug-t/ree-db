<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

$path = isset($_GET['path']) ? $_GET['path'] : '';

// --- 1. SPECIFIC CIF ROUTE ---
if (preg_match('/^materials\/([a-zA-Z0-9]+)\/cif$/', $path, $matches)) {
    header('Content-Type: text/plain');
    $pcd = $matches[1];
    $filePath = findCifFile(__DIR__ . '/cif_files', $pcd);
    if ($filePath && file_exists($filePath)) {
        readfile($filePath);
    } else {
        http_response_code(404);
        echo "CIF file for $pcd not found.";
    }
    exit;
}

// --- 2. SPECIFIC BAND ROUTE ---
if (preg_match('/^materials\/([a-zA-Z0-9]+)\/band$/', $path, $matches)) {
    header('Content-Type: text/plain');
    $pcd = $matches[1];
    $filePath = __DIR__ . "/band_files/" . $pcd . ".ene";
    if (file_exists($filePath)) {
        readfile($filePath);
    } else {
        http_response_code(404);
        echo "Electronic data not found.";
    }
    exit;
}

// --- 3. SINGLE MATERIAL METADATA ROUTE ---
// We check this BEFORE the general 'materials' route
if (preg_match('/^materials\/([a-zA-Z0-9]+)$/', $path, $matches)) {
    $pcd = $matches[1];
    $dataFile = 'cfp_dataset.json';
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        if (isset($data[$pcd])) {
            echo json_encode($data[$pcd]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Material $pcd not found in database."]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database file missing."]);
    }
    exit;
}

// --- 4. GENERAL MATERIALS ROUTE (Search Dashboard) ---
if ($path === 'materials' || $path === '') {
    $dataFile = 'cfp_dataset.json';
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "JSON Database not found."]);
    }
    exit;
}

// Helper: Recursive search for CIF files
function findCifFile($base, $pcd) {
    if (!is_dir($base)) return null;
    $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($base));
    foreach ($it as $f) {
        if ($f->isFile() && pathinfo($f, PATHINFO_EXTENSION) == 'cif' && strpos($f->getFilename(), $pcd) !== false) {
            return $f->getPathname();
        }
    }
    return null;
}

http_response_code(404);
echo json_encode(["error" => "Route not found: " . $path]);
