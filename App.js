if (typeof web3 !== 'undefined')
{
    web3 = new Web3(web3.currentProvider);
}
else
{
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

$("#loader").hide();
var userId=0;
var PatientContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "getPatients",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "PatientList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_lName",
				"type": "string"
			},
			{
				"name": "_phoneNo",
				"type": "string"
			}
		],
		"name": "setPatient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getPatient",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "lName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "phoneNo",
				"type": "string"
			}
		],
		"name": "PatientReg",
		"type": "event"
	}
]
);
var Patient = PatientContract.at('0x891951344937a510ebfd481649d2b4c80f8203c6');

$("#button").click(function() {
$("#loader").show();
userId++;
Patient.setPatient(web3.eth.defaultAccount,userId,$("#patientAge").val(), $("#firstName").val(),$("#lastName").val(),$("#phoneNo").val(), (err, res) => {
      if (err)
       {
          $("#loader").hide();
       }
  });
});


Patient.getPatient(web3.eth.defaultAccount,(error, result) => {
            if(!error)
                {
                    $("#getId").html("0"+result[0]);
                    $("#getAge").html("0"+result[1]);
                    $("#getFname").html(result[2]);
                    $("#getLname").html(result[3]);
                    $("#getPhoneNo").html(result[4]);
                }
            else
              console.error(error);
          });
