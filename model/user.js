function User(name) {
	this.name = name;
}

User.prototype.getName = function() {
	return this.name;
}

User.prototype.setId = function(id) {
	this.id = id;
}

User.prototype.getId = function() {
	return this.id;
}

exports.user = User;