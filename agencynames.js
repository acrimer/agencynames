var Twit = require('twit');
var http = require('http');

//for modulus
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(process.env.PORT);

console.log('Server running on port ' + process.env.PORT);

//to tweet it
var T = new Twit({
  consumer_key:         '', 
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  ''
});

//stuff to choose from
//most of the animals are from https://github.com/hzlzh/Domain-Name-List/blob/master/Animal-words.txt
var numbers = ["No","One","Two","Three","Four","Five","Six","Seven","Eight","Fourteen","Twenty","All","Many","Some"];
var adjs = ["Red","Orange","Yellow","Green","Blue","Indigo","Violent","Purple","Black","White","Turquoise","Cerulean","Emerald","Ruby","Topaz","Sapphire","Gold"];
var nouns = ["Aardvark","Albatross","Alligator","Alpaca","Ant","Anteater","Antelope","Ape","Armadillo","Ass","Donkey","Baboon","Badger","Barracuda","Bat","Bear","Beaver","Bee","Bison","Boar","Buffalo","Butterfly","Camel","Caribou","Cat","Caterpillar","Cattle","Cheetah","Chicken","Chimpanzee","Chinchilla","Clam","Cobra","Cockroach","Cod","Cormorant","Coyote","Crab","Crane","Crocodile","Crow","Curlew","Deer","Dinosaur","Dog","Dogfish","Dolphin","Donkey","Dotterel","Dove","Dragonfly","Duck","Dugong","Dunlin","Eagle","Echidna","Eel","Eland","Elephant","Elephant Seal","Elk","Emu","Falcon","Ferret","Finch","Fish","Flamingo","Fly","Fox","Frog","Gazelle","Gerbil","Giant Panda","Giraffe","Gnat","Gnu","Goat","Goose","Goldfinch","Goldfish","Gorilla","Goshawk","Grasshopper","Grouse","Guanaco","Guinea Fowl","Guinea Pig","Gull","Hamster","Hare","Hawk","Hedgehog","Heron","Herring","Hippopotamus","Hornet","Horse","Hummingbird","Hyena","Jackal","Jaguar","Jay","Blue Jay","Jellyfish","Kangaroo","Koala","Komodo Dragon","Kouprey","Kudu","Lapwing","Lark","Lemur","Leopard","Lion","Llama","Lobster","Locust","Loris","Louse","Lyrebird","Magpie","Mallard","Manatee","Marten","Meerkat","Mink","Mole","Monkey","Moose","Mouse","Mosquito","Mule","Narwhal","Newt","Nightingale","Octopus","Okapi","Opossum","Oryx","Ostrich","Otter","Owl","Ox","Oyster","Panther","Parrot","Partridge","Peafowl","Pelican","Penguin","Pheasant","Pig","Pigeon","Pony","Porcupine","Porpoise","Prairie Dog","Quail","Rabbit","Raccoon","Ram","Rat","Raven","Reindeer","Rhinoceros","Rook","Ruff","Salamander","Salmon","Sand Dollar","Sandpiper","Sardine","Scorpion","Sea Lion","Sea Urchin","Seahorse","Seal","Shark","Sheep","Shrew","Shrimp","Skunk","Snail","Snake","Spider","Squid","Squirrel","Starling","Stingray","Stinkbug","Stork","Swallow","Swan","Tapir","Tarsier","Termite","Tiger","Toad","Trout","Turkey","Turtle","Vicuña","Viper","Vulture","Wallaby","Walrus","Wasp","Water Buffalo","Weasel","Whale","Wolf","Wolverine","Wombat","Woodcock","Woodpecker","Worm","Wren","Yak","Zebra","Rocket","Zeppelin","Balloon","Antler","Cupboard","Teacup","Mug","Sled","Carousel","Feather","Email","Letter","Mailbox","Tree","Frond","Boxcar","Smokestack","Armchair","Bicycle","Carriage","Schoolbus","Treehouse"];
var types = ["Design","Studios","Labs","Designs","Studio","Branding","Design & Branding","Design & Digital","Design & Strategy","Creative","Creative & Branding","Strategy & Branding","Creative & Strategy","Design + Branding","Creative + Design","Creative + Branding","Digital Design"];

//choose the agency name from the lists
function startAgency() {
	agencyName = "";
	var plural = 0;
	//maybe it's a number of objects
	var chance1 = Math.random();
	if (chance1 > .7){
		var pos = Math.floor(Math.random()*numbers.length);
		var number = numbers[pos];
		if (pos > 1) {
			plural = 1;			
		};
		agencyName += number + " ";
	};
	//but it definitely has a colorful modifier
	var adj = adjs[Math.floor(Math.random()*adjs.length)];
	agencyName += adj + " ";
	//and a noun, almost always an animal
	var noun = nouns[Math.floor(Math.random()*nouns.length)];
	//which has to be plural if the number is greater than one
	if (plural === 1){
		if (noun.slice(-1) === "s"){
			noun += "es";
		}
		else {
			noun += "s";
		};
	};
	agencyName += noun;
	//then there's a chance we'll actually explain what our agency does
	var chance2 = Math.random();
	if (chance2 > 0.3) {
		var type = types[Math.floor(Math.random()*types.length)];
		agencyName += " " + type;
	};
	//put it up on twitter
	T.post('statuses/update', { status: agencyName}, function(err, reply) {
		console.log("error: " + err);
		console.log("reply: " + reply);
	});
};

//now do it twice an hour
setInterval(function() {
	try {
		startAgency();
	}
	catch (e) {
		console.log(e);
	}
},60000*30);