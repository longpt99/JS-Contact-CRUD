 // * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 // * - Nhập dữ liệu contact (name, phone number)
 // * - Sửa dữ liệu contact
 // * - Xoá contact
 // * - Tìm kiếm contact: có thể nhập vào tên 
 // * - (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
var readlineSync = require('readline-sync');
var fs = require('fs');
var phoneList= [];

function main(){
	function data(){
		phoneList = JSON.parse(fs.readFileSync("./db.json"))
		arrangeId();
	}data();

	function arrangeId(){
		phoneList = phoneList.map(function(value, index){
			value.id = index;
			return value;
		})
	};

	console.log('---------------------------------');
	console.log('<-- Telephone Directory -->');
	console.log('1. Show all contacts');
	console.log('2. Creat a new contact');
	console.log('3. Edit contacts');
	console.log('4. Delete contacts');
	console.log('5. Search contacts');
	console.log('6. Exit');
	console.log('---------------------------------');

	let option = readlineSync.question('Chose your option: ')
	switch(option){
		case '1': showContact(); main(); break;
		case '2': newContact(); main(); break;
		case '3': editContact(); main(); break;
		case '4': delContact(); main(); break;
		case '5': searchContact(); main(); break;
		case '6': break;
		default: main(); break;
	}

	function showContact(){
		console.log(phoneList);
	}

	function newContact(){
		let userName = readlineSync.question('Name Contact: ');
		let userNum = readlineSync.question('Number Contact: ');

		//Viết hoa chữ cái đầu tiên
		// function capitalizedName(){
		// 	let capName = userName.split(" ");
		// 	let result = [];
		// 	for(let word of capName){
		// 		result.push(word[0].toUpperCase() + word.slice(1));
		// 	}
		// 	return result.join(" ");
		// }
		
		var user = {
			id: phoneList.length,
			name: userName,
			number:  Number(userNum)
		}
		console.log(user);

		function saveContact(){
			let save = readlineSync.question('Do you want to save this contact?(yes/no): ');
			switch(save){
				case 'yes': console.log("Add contact successfully");
							phoneList.push(user); phoneList = JSON.stringify(phoneList);
							fs.writeFileSync('./db.json', phoneList, {encoding: 'utf-8'}); break;
				case 'YES': console.log("Add contact successfully");
							phoneList.push(user); phoneList = JSON.stringify(phoneList);
							fs.writeFileSync('./db.json', phoneList, {encoding: 'utf-8'}); break;							
				case 'no': 	break;
				case 'NO': 	break;
				default: 	console.log("Add contact successfully");
							phoneList.push(user); phoneList = JSON.stringify(phoneList);
							fs.writeFileSync('./db.json', phoneList, {encoding: 'utf-8'}); break;
			}
		}saveContact();
	}

	function editContact(){
		showContact();
		let id = readlineSync.question("Chose a id contact need to edit: ");
		let getData = phoneList.filter(function(value){
      		return value.id === parseInt(id);
		});
		let getId = phoneList.findIndex(function(value){
			return value.id === parseInt(id);
		});

		console.log(getData)
		phoneList.splice(getId,1); //Del Id
		//Edit a new contact
		let newName = readlineSync.question("Name: ");
		let newNum = readlineSync.question("Number: ");
		getData[0].name = newName;
		getData[0].number = Number(newNum);
		console.log("New contact: ", getData);
		phoneList.splice(getId, 0 , getData[0]); // Add values to the specified (xác định) position
		phoneList = JSON.stringify(phoneList);
		fs.writeFileSync('./db.json', phoneList, {encoding: 'utf-8'});
	}
	

	function delContact(){
		showContact();
		let id = readlineSync.question("Chose a id contact to delete: ");
		let getData = phoneList.filter(function(value){
      		return value.id === parseInt(id);
		});
		let getId = phoneList.findIndex(function(value){
			return value.id === parseInt(id);
		});
		console.log(getData)
		phoneList.splice(getId,1);
		arrangeId();
		phoneList = JSON.stringify(phoneList);
		fs.writeFileSync('./db.json', phoneList, {encoding: 'utf-8'});
	}

	function searchContact(){
		let search = readlineSync.question("Type to seach contact(Name/Number): ");
		if(!isNaN(search)){
			search = Number(search);
			let result = phoneList.filter(function(value){
				return (value.number).toString().indexOf(search.toString()) === 0;
			})
			console.log(result);
		}else{
			search = search.toString();
			let result = phoneList.filter(function(value){
				return change_alias(value.name).toLowerCase().indexOf(change_alias(search).toLowerCase()) === 0;
			})
			console.log(result);
		}
	};

	function change_alias(alias) {
	    var str = alias;
	    str = str.toLowerCase();
	    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"d"); 
	    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	    str = str.replace(/đ/g,"d");
	    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
	    str = str.replace(/ + /g," ");
	    str = str.trim(); 
	    return str;
  	}

}main();