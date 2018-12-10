<?php
	$servername	= "localhost";
	$username	= "family_feud";
	$password	= "SQLM7mCKtKmMWXR2";
	$dbname		= "family_feud";

error_reporting(E_ALL);
ini_set('display_errors', 1);

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	if(isset($_POST['btn'])){
		$stmt = $conn->prepare("INSERT INTO commands (command) VALUES(?)");
		$stmt->bind_param("s", $_POST['btn']);
		$stmt->execute();
		die("success");
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
[//Nimeta üks Tartu Ülikooli hoone, kust leiab kõige rohkem teadust.
    ['Füüsikum', 32],
    ['Keemikum', 25],
    ['Liivi 2', 8],
    ['Tü raamatukogu', 7]
], [//Nimeta üks amet, mida vanavanemad enamasti õppima soovitavad minna.
    ['Aadrilaskja/tohtrionu', 16], // arst
    ['Perfolindi asetaja/asendaja', 11], // IT
    ['Insener', 10],
    ['Põllumajandus/traktorist', 9]
], [//Peale toidu, nimeta veel üks asi, millega saab tudengit loengusse meelitada.
    ['Loengupunktid', 16],
    ['Hea õppejõud', 11],
    ['Meemid/huvitav loeng', 10],
    ['KT/eksami vastused', 9]
], [//Nimeta toit, mida tudengid tarbivad.
    ['Šokolaad/snickers', 16],
    ['(kiir)nuudlid', 11],
    ['Pelmeenid', 10],
    ['Purgisupp', 9]
], [//Nimeta üks avalikult tuntud TÜ õppejõud, kes sinu arvates saab kõige rohkem armastuskirju.
    ['Tarkpea', 16],
    ['Karek Kolk', 11],
    ['Mihhail Lotman', 10],
    ['Mats Mikkor', 9]
], [//Nimeta üks põhjus, miks inimene tahab füüsikuks saada.
    ['Keskmine palk', 16], // raha
    ['Masohhistlikult vastupidav', 11],
    ['Teadmisrõõm', 10],
    ['Vereliin - pereliin', 9]
], [//Nimeta üks asi, mille üle varas ei tahaks üllatuda, kui ta Füüsika Instituuti sisse murrab?
    ['Kalev Tarkpea ootab koridoris', 16],
    ['Tudengeid õppimas', 11],
    ['STEM kaalub samapalju kui bemm', 10],
    [' - ', 9]
], [//Nimeta midagi, mida eeldatakse, et 25-aastane inimene on juba saavutanud.
    ['Pesast välja hüpanud', 16],//Kodust välja kolinud
    ['Elukaaslane/koduloom', 11],
    ['Vumm-vumm', 10],//Auto
    [' - ', 9]
], [//Nimeta miski, mis paneb õppejõude kõige rohkem nutma kui nad eksamit parandavad.
    ['Magistrisse minna', 16],
    ['-', 11],
    ['-', 10],
    [' - ', 9]
]
	</pre>
	<button class="w3-button w3-red" id="refresh-page">Refresh page</button>
</body>
</html>