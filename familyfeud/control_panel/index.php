<?php

	/************************************************************************************************
	*    ____                    __   _                                  _     _                    *
	*   / ___|   ___    _ __    / _| (_)   __ _   _   _   _ __    __ _  | |_  (_)   ___    _ __     *
	*  | |      / _ \  | '_ \  | |_  | |  / _` | | | | | | '__|  / _` | | __| | |  / _ \  | '_ \    *
	*  | |___  | (_) | | | | | |  _| | | | (_| | | |_| | | |    | (_| | | |_  | | | (_) | | | | |   *
	*   \____|  \___/  |_| |_| |_|   |_|  \__, |  \__,_| |_|     \__,_|  \__| |_|  \___/  |_| |_|   *
	*                                     |___/                                                     *
	************************************************************************************************/
	$USERNAME = "admin";
	$PASSWORD = "admin";

	$servername	= "localhost";
	$username	= "family_feud";
	$password	= "SQLM7mCKtKmMWXR2";
	$dbname		= "family_feud";


	/**********************************************************
	*      _        _                                         *
	*     / \      (_)   __ _  __  __                         *
	*    / _ \     | |  / _` | \ \/ /                         *
	*   / ___ \    | | | (_| |  >  <                          *
	*  /_/   \_\  _/ |  \__,_| /_/\_\                         *
	*            |__/                                         *
	*   _                      _                         _    *
	*  | |__     __ _    ___  | | __   ___   _ __     __| |   *
	*  | '_ \   / _` |  / __| | |/ /  / _ \ | '_ \   / _` |   *
	*  | |_) | | (_| | | (__  |   <  |  __/ | | | | | (_| |   *
	*  |_.__/   \__,_|  \___| |_|\_\  \___| |_| |_|  \__,_|   *
	*                                                         *
	**********************************************************/

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	
	if(isset($_POST['get_latest_id'])){
		$sql = "SELECT id FROM commands ORDER BY id DESC LIMIT 1";
		$result = mysqli_query($conn, $sql);

		if ($result === false){
			die("an error occurred: ".$conn->error);
		}else if (mysqli_num_rows($result) > 0) {
			$row = mysqli_fetch_assoc($result);
			die($row['id']);
		} else {
			die("0");
		}
	}
	if(isset($_POST['get_commands_since'])){
		$since = $_POST['get_commands_since'];
		$stmt = $conn->prepare("SELECT command, id FROM commands WHERE id > ? LIMIT 1");
		$stmt->bind_param("s", $since);
		$result = $stmt->execute();
		$stmt->bind_result($cmd, $id);
		if($stmt->fetch()){
			die($cmd."|".$id);
		}else{
			die("NONE");
		}
	}

	/***********************************
	*   _   _                          *
	*  | | | |  ___    ___   _ __      *
	*  | | | | / __|  / _ \ | '__|     *
	*  | |_| | \__ \ |  __/ | |        *
	*   \___/  |___/  \___| |_|        *
	*                   _     _        *
	*    __ _   _   _  | |_  | |__     *
	*   / _` | | | | | | __| | '_ \    *
	*  | (_| | | |_| | | |_  | | | |   *
	*   \__,_|  \__,_|  \__| |_| |_|   *
	*                                  *
	***********************************/


	if (!isset($_SERVER['PHP_AUTH_USER'])) {
	    requireLogin();
	} else {
		if($_SERVER['PHP_AUTH_USER'] === $USERNAME  &&  $_SERVER['PHP_AUTH_PW'] === $PASSWORD){
			//All OK, the user and passeord matched
		}else{
			requireLogin();
		}
	}

	function requireLogin(){
		header('WWW-Authenticate: Basic realm="Restricted area"');
	    header('HTTP/1.0 401 Unauthorized');
	    echo 'You need to log in in order to control the game!';
	    exit;
	}
	
	if(isset($_POST['btn'])){
		$stmt = $conn->prepare("INSERT INTO commands (command) VALUES(?)");
		$stmt->bind_param("s", $_POST['btn']);
		$stmt->execute();
		die("success");
	}

	

?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>FF Control Panel</title>
	<link rel="stylesheet" href="w3.css">
	<script src="jquery.js"></script>
	<script src="control_panel.js"></script>
</head>
<body>
	<center>
	<h1>Family Feud Control Panel</h1>
	<table>
		<tr>
			<td>
				<button class="w3-button w3-blue" id="open-1">Open #1 answer</button>
			</td>
			<td>
				<button class="w3-button w3-blue" id="open-3">Open #3 answer</button>
			</td>
		</tr>
		<tr>
			<td>
				<button class="w3-button w3-blue" id="open-2">Open #2 answer</button>
			</td>
			<td>
				<button class="w3-button w3-blue" id="open-4">Open #4 answer</button>
			</td>
		</tr>
	</table>

	<table>
		<tr>
			<td>
				<button class="w3-button w3-pale-blue" id="choose-left">LEFT team</button>
			</td>
			<td>
				<button class="w3-button w3-red" id="wrong">WRONG</button>
			</td>
			<td>
				<button class="w3-button w3-pale-blue" id="choose-right">RIGHT team</button>
			</td>
		</tr>
	</table>
	<table>
		<tr>
			<td>
				<button class="w3-button w3-green" id="start-game">Start game</button>
			</td>
			<td>
				<button class="w3-button w3-yellow" id="music-toggle">Toggle MUSIC</button>
			</td>
			<td>
				<button class="w3-button w3-green" id="next-round">Next round</button>
			</td>
		</tr>
	</table>
</center>
	<pre style="margin:0 auto;border: 1px solid black;width:100vw;height:300px;overflow-y: scroll">
gameBlock[3] = [
    [// Nimeta levinuim Linuxi käsurea käsk:
        ['ls', 40],
        ['cd', 30],
        ['mv', 20],
        ['apt', 10]
    ], [// Nimeta võimalikult turvaline WiFi krüpteeringustandard
        ['WPA3', 40],
        ['WPA2', 30],
        ['WPA', 20],
        ['WEP', 10]
    ], [// Nimeta üks kõige levinuimatest kettaseadmeühendusstandarditest
        ['SATA', 40],
        ['M.2', 30],
        ['PATA', 20],
        ['SCSI', 10]
    ], [// Nimeta üks levinumatest Android'i versioonidest
        ['7.0/7.1 Nougat', 40],
        ['6.0 Marshmallow', 30],
        ['5.1/5.0 Lollipop', 20],
        ['8.1/8.0 Oreo', 10]
    ], [// Nimeta üks operatsioonisüsteem millega saab veebilehti kuvada (based on https://en.wikipedia.org/wiki/Usage_share_of_operating_systems)
        ['Android', 40],
        ['Windows', 36],
        ['Apple\'i iOS', 14],
        ['Apple\'i macOS', 6]
    ]
];
	</pre>
	<button class="w3-button w3-red" id="refresh-page">Refresh page</button>
</body>
</html>