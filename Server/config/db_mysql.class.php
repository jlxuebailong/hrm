<?php
class DB_MySQL
{

var $Host = "localhost";	//數據庫IP
var $Database = "test";		//數據庫名稱
var $User = "root";			//用戶名
var $Password = "123456";		//密碼

var $Link_ID = 0;
var $Query_ID = 0;
var $Row_Result = array();
var $Field_Result = array();
var $Affected_Rows;
var $Rows;
var $Fields;
var $Row_Position = 0;

//*******************************************************
	function __construct()
	{
		$this->connect();
	}//__construct()

	function __destruct()
	{
		mysqli_free_result($this->Query_ID);
		mysqli_close($this->Link_ID);
	}//__destruct()

	function connect($Database = "",$Host = "",$User = "",$Password = "")
	{
		if ("" == $Database)
		{
		  $Database = $this->Database;
		}
		if ("" == $Host)
		{
		  $Host     = $this->Host;
		}
		if ("" == $User)
		{
		  $User     = $this->User;
		}
		if ("" == $Password)
		{
		  $Password = $this->Password;
		}
		//==========================
		if (!$this->Link_ID )
		{
			$this->Link_ID=mysqli_connect($Host,$User,$Password,$Database);
			if (!$this->Link_ID)
			{
				$this->halt("connect halt1 !");
			}
			if (!mysqli_select_db($this->Link_ID, $this->Database))
			{
				$this->halt("connect halt2 :".$this->Database);
			}
		}
		return $this->Link_ID;
	}//connect()

	function free()
	{
		if ( @mysql_free_result($this->Query_ID) )
		unset ($this->Row_Result);
		$this->Query_ID = 0;
	}//free()

	function query($Query_String)
	{
		if ($this->Query_ID)
		{
			$this->free();
		}
		if(!$this->Link_ID)
		{
			$this->connect();
		}
		@mysqli_query($this->Link_ID, "set names utf8");
		$this->Query_ID = @mysqli_query($this->Link_ID, $Query_String);
		if (!$this->Query_ID) 
		{
			$this->halt("SQL: ".$Query_String);
		}
		return $this->Query_ID;
	}//query()
	function seek($pos)
	{
		if(@mysql_data_seek($this->Query_ID, $pos))
		{
			$this->Row_Position = $pos;
			return true;
		}
		else
		{
			$this->halt("halt seek !");
			return false;
		}

	}//seek()

	function get_rows_array()
	{
		$this->get_rows();
		for($i=0;$i<$this->Rows;$i++)
		{
			if(!mysql_data_seek($this->Query_ID,$i))
			{
				$this->halt("mysql_data_seek halt");
			}
			$this->Row_Result[$i] = mysql_fetch_array($this->Query_ID);
		}
		return $this->Row_Result;
	}//get_rows_array()

	function get_fields_array()
	{
		$this->get_fields();
		for($i=0;$i<$this->Fields;$i++)
		{
			$obj = mysql_fetch_field($this->Query_ID,$i);
			$this->Field_Result[$i] = $obj->name;
		}
		return $this->Field_Result;
	}//get_fields_array()

	function get_affected_rows()
	{
		$this->Affected_Rows = mysql_affected_rows($this->Link_ID);
		return $this->Affected_Rows;
	}//Get_Affected_Rows()

	function get_rows()
	{
		$this->Rows = mysql_num_rows($this->Query_ID); 
		return $this->Rows;
	}//Get_Rows()

	function get_fields()
	{
		$this->Fields = mysql_num_fields($this->Query_ID);
		return $this->Fields;
	}//Get_Fields()

	function fetch_one_array($sql)
	{
		$this->query($sql);
		return mysqli_fetch_array($this->Query_ID);
	}//fetch_one_array()

	function halt($msg)
	{
		$this->Error=mysql_error();
		printf("<BR><b>Halt:</b> %s<br>\n", $msg);
		printf("<b>MySQL Exception.<br>\n",	$this->Error);
		die("HALTֹ");
	}//halt()
}
?>