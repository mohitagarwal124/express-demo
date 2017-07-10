function showData(res) {
	console.log('show data');
    var query = ' SELECT * FROM register_user';
    connection.query(query, function(err, result) {
        if (err) {
            console.log('show query error');
        } else {
            console.log(JSON.stringify(result));
        }
         res.json({'data': 'success'});
    });
}

function inputData(name, city, res) {
	console.log('called');
    var data = {
        name: name,
        city: city
    };
    var query = 'INSERT INTO register_user SET ?';
    connection.query(query, data, function(err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(500).end();
        } else if (result.affectedRows == 1) {
            console.log('data inserted');
            showData(res);
        } else {
            res.status(403).end();
        }
    });
}



exports.register_user = function(req, res) {
    if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('city')) {
    	console.log('data exist');
        inputData(req.body.name, req.body.city, res);
    } else {
        res.status(403).end();
    }
}