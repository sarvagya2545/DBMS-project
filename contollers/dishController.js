module.exports = {
    addOrder: async (req, res) => {
        console.log('orders: ', req.body);
        console.log(req.user.id);

        let string = 'THis is a number: ' + number + '. WOW!';
        string = `This is a number ${number} WOW!`;
        let query = `INSERT INTO order (id, cid, eid) values ('${req.body.cid}')`
    }
}