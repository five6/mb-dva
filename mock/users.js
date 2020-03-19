export default {
    'PUT /api/v1/users/logout': (req,res) => {
        console.log(req.body);
        res.json({
            code: 0,
            datas: null,
            success: true,
            mesage: 'success'
        });
    }
}