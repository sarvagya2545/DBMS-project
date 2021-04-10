module.exports = {
	dashboard: function (req, res) {
		try {
			req.getConnection((err, conn) => {
				if (err) {
					console.log(err);
				}

                else{
                    res.render("dashboard");
                }

				

					
				
			});
		} catch (error) {
			console.log(error);
		}
	}
	
};