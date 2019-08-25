<?php


//提示指定信息并跳转到指定页面
function warn($info,$url = "")
{
	?>
	<script language="JavaScript">
	alert("<?=$info;?>");
	if("<?=$url;?>" != ""){
		window.location.href = "<?=$url;?>";
	}
	else history.back();
	</script>
    <?php
	exit();
}
function redirect_($url){
	?>
	<script language="JavaScript">
	if("<?=$url;?>" != ""){
		window.location.href = "<?=$url;?>";
	}
	else history.back();
	</script>
    <?php
	exit();
}

//直接跳转
function redirect_once($url)
{
	echo "<meta http-equiv='refresh' content='0;url=$url'>";
}

function redirect($info,$url)
{
	echo $info;
	echo "<meta http-equiv='refresh' content='2;url=$url'>";
}

function forward($url){

	//Header("Location: ".$url); //最快
	redirect_($url);             //中
	//redirect_once($url);       // 慢
}

function   string_to_array(   $str , $splitChar  )   
  {   
	  $tmp   =   explode(  $splitChar,   $str   );   
	  $arr   =   array();   
	  $index = 0;
	  foreach(   $tmp   as   $v   )   
	  {   
	  	  $arr[$index++]   =   $v;   
	  }   
	  return   $arr;   
}   
function string_to_array2($str){
	  $a   =   array();   
	  preg_replace('/(.+?)=[\']{0,1}([^\']+)[\']{0,1}/e',   
	  '\$a[\'$1\']   =   \'$2\'',   $str);  
	   print_r($a);    
	  return $a;
}
function fullPlaceholder($str, $place){
	if($str == null  || trim($str) == "" ){
		return $place;
	}
	return $str;
}

function checkEmailIsExist($email){
    global $DB;
	$sql = "select user_id from so_users where email = '".$email."'";
	if($res=$DB->fetch_one_array($sql)){
		return $res['user_id'];
	}
	return false;
}
function HtmlEncode($fString)
{
	if($fString!="")
	{
		// $fString = str_replace( '>', '&gt;',$fString);
		// $fString = str_replace( '<', '&lt;',$fString);
		// $fString = str_replace( chr(32), '&nbsp;',$fString);
		 $fString = str_replace( chr(13), ' ',$fString);
		 //$fString = str_replace( chr(10) & chr(10), '<br>',$fString);
		 $fString = str_replace( chr(10), '',$fString);
		 //$fString = str_replace( chr(10), '<BR>',$fString);
	}
		 return $fString;
}

function EncodeHtml($fString)
{
	if($fString!="")
	{
		 $fString = str_replace("&gt;" , ">", $fString);
		 $fString = str_replace("&lt;", "<", $fString);
		 $fString = str_replace("&nbsp;",chr(32),$fString);
		 $fString = str_replace("",chr(13),$fString);
		 $fString = str_replace("<br>",chr(10) & chr(10),$fString);
		 $fString = str_replace("<BR>",chr(10),$fString);
	}
     return $fString;
}

function formatDate($dataString){
	if($dataString){
		if(strlen($dataString)>10){
		 return substr($dataString,0,10);
		 }
	 }
	 return $dataString;
}

//獲取當前頁面的URL
function getCurrentPageUrl(){
   return $url_this =  "http://".$_SERVER ['HTTP_HOST'].$_SERVER['PHP_SELF'];
}




function sendEmail($email, $title, $content){
     //暫時改用另一方式發送郵件
	//$hearer="From:$from\nReply-To:$from\nX-Mailer: PHP/".phpversion()."\nContent-Type:text/html";
	//return mail($email,$title, $content,$hearer);
	
	return phpMailterSendEmail($email,$title, $content,$hearer);
}

function phpMailterSendEmail($email, $title, $content){
	include("../util/mail/php4/php4SendEmail.php");
	return sendEmail_($email, $title, $content);
}

//得到用戶激活郵件內容， 以發送之
function getUserRegisterEmailSubject(){
	$subject="SmartOrange橙智藝術會員註冊信";
	return $subject;
}
function getUserRegisterEmailContent($user_id,$email,$pwd){
 $url = "http://www.smartorange.com.tw/menber/menber_mailcomfirm.php?user_id=".$user_id;
 $url = getDecodedUrl($url);
 $content  =" 歡迎您加入SmartOrange橙智藝術 ！<br>";
 $content .= "您的SmartOrange帳號已經成功建立，<br>";
 $content .=" <a href='$url'>請點選此處確認啟用您的帳號。<a><br>";
 $content .=" 如果點選上面的連結無法正常運作，你可以自行輸入或複製這個網址到你的瀏覽器。<br>";
 $content .=" <a href='$url'>$url<a><br/>";
 $content .=" 您的帳號資料如下：<br>";
 $content .=" 帳號  ：".$email." <br/>";
 $content .=" 密碼  ：".$pwd."       <br/>";
 $content .=" 請妥善保存您的帳號與密碼，如果您忘記了密碼，可以在<br>";
 $content .=" 使用者登錄介面通過“忘記密碼”，來重設您的密碼。<br>"; 
 $content .=" 注意：<br>";
 $content .=" 1、新帳號註冊成功之後，請將您的個人資料填寫完整，以便課程報名。<br>";
 $content .=" 2、您有任何問題，可以寫信給管理員<a href='mailto:service@SmartOrange.com'>service@SmartOrange.com </a>，尋求幫助。<br>";
 $content .=" 3、進入SmartOrange橙智藝術管理顧問網站：<a href='http://www.SmartOrange.com.tw/'>http://www.SmartOrange.com.tw/ </a>開始我們的服務。<br>";
 $content .=" 感謝您的註冊！<br>";
 $content .=" <br>"; 
 $content .=" SmartOrange橙智藝術管理顧問網站小組 敬上<br>";
 return $content; 
}

//得到會員訂購課程後成功後的郵件內容， 以發送之
function getMenberBuyCourseEmailSubject(){
	$subject = "課程訂購確認信";
	return $subject;
}
function getMenberBuyCourseEmailContent($course_name){
	$content = "親愛的會員您好！ <br/>";
	$content .= "我們高興的通知您， 你在".getCurrentTime()."訂購了我們的課程： <br/>";
	$content .= $course_name." , 謝謝您的參加， 我們會歇誠為您服務！ ";
	return $content;
}
//得到會員訂購點數後成功後的郵件內容， 以發送之
function getMenberBuyPointsEmailSubject(){
	$subject = "時數卡訂購確認信";
	return $subject;
}
function getMenberBuyPointsEmailContent($points){
	$content = "親愛的會員您好！ <br/>";
	$content .= "我們高興的通知您， 你在".getCurrentTime()."訂購了我們的培訓時點： <br/>";
	$content .= $points." , 謝謝您的參加， 我們會歇誠為您服務！ ";
	return $content;
}

function getCurrentTime(){
 return date("Ymd");   
}

//截取文本
function substr_gb($string_input,$start,$length)
{
	/*
	*/
	$str_input = $string_input;
	$return_str = "";
	$len = $length;
	for($i=0;$i<2*$len+2;$i++)
		$return_str = $return_str." ";
	$start_index = 0;
	for($i=0;$i<$start;$i++)
	{
		if(ord($str_input{$start_index})>=161)
			$start_index +=2;
		else
			$start_index +=1;
	}
	$chr_index = $start_index;
	for($i=0;$i<$len;$i++)
	{
		$asc = ord($str_input{$chr_index});
		if($asc >= 161)
        {
			$return_str{$i} = chr($asc);
			$return_str{$i+1} = chr(ord($str_input{$chr_index+1}));
			$len += 1;	
			$i++;
			$chr_index += 2;	
			continue;
		}
		else
		{
			$return_str{$i} = chr($asc);
			$chr_index += 1;
		}
	}
    return trim($return_str);
}
//URL編碼
function do_url_encode($url){
	$url=base64_encode($url);
	return $url;
}

//echo do_url_encode("user_id=6");
//解碼
function do_url_decode($url){
	$url=base64_decode($url);
	return $url;
}
//將指定的URL參數進行編碼後反回
function getDecodedUrl($url){
	$ps=explode('?', $url); 
	$encodeUrlPar=do_url_encode($ps[1]);
	$encodedUrl=$ps[0]."?".$encodeUrlPar;
	return $encodedUrl;
}
//從編碼後的URL中解析出查詢參數
function getUserId($url){
	$ps=explode('?', $url); 
	if($ps[1]){
		$par=do_url_decode($ps[1]);
		$ps=explode('=', $par); 
		if($ps[1]){
			return $ps[1];
		}
	}
}
//創建課程訂單號
function createCourseOrderID(){
 return "COU-".date("YmdHms").rand(01,99); 
}
//時點訂單號
function createPointsOrderID(){
 return "HPI-".date("YmdHms").rand(01,99); 
}
?>