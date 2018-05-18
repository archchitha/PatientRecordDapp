pragma solidity ^0.4.18;

contract Owned {

    address owner;
    function Owned() public {
        owner = msg.sender;
    }
   modifier onlyOwner {
       require(msg.sender == owner);
       _;
   }
}

contract PatientContract is Owned {

  struct PatientRecord {
        uint256 id;
        uint256 age;
        string fName;
        string lName;
        string phoneNo;
            }

  mapping (address => PatientRecord) patientMap;
  address[] public PatientList;

  event PatientReg  (
       uint256 id,
       uint256 age,
       string fName,
       string lName,
       string phoneNo
    );

  function setPatient(address _address, uint256 _id, uint256 _age, string _fName, string _lName, string _phoneNo) onlyOwner public {

        var Patient = patientMap[_address];

        Patient.id = _id;
        Patient.age =_age;
        Patient.fName = _fName;
        Patient.lName = _lName;
        Patient.phoneNo =_phoneNo;

        PatientList.push(_address) -1;
        PatientReg(_id,_age,_fName, _lName,_phoneNo);
    }


    function getPatients() view public returns(address[]) {
        return PatientList;
    }

    function getPatient(address _address) view public returns (uint256,uint256, string, string,string) {
        return (patientMap[_address].id,patientMap[_address].age, patientMap[_address].fName, patientMap[_address].lName,patientMap[_address].phoneNo);
    }
}
