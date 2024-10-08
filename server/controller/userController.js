import userModle from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userModle.getAllUsers();
        // 사용자 정보를 모두 조회해서 users라는 변수에 담아. 당장. 얼른.
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "db connection is failed",
            maessage: "데이터 베이스 연결이 실패했습니다 ㅈㅅㅈㅅ ㄱㄷㄱㄷ"
        })
        
    }

}
const getOneUser = async (req, res) => {
    // localhost:3000/getOneUser/유저ID
    const id = req.params.id;
    try {
        const users = await userModle.getOneUser(id);
        // 사용자 정보를 모두 조회해서 users라는 변수에 담아. 당장. 얼른.
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "db connection is failed",
            maessage: "데이터 베이스 연결이 실패했습니다 ㅈㅅㅈㅅ ㄱㄷㄱㄷ"
        })
        
    }

}

const addUser = async (req, res) => {
    // localhost:3000/getOneUser/유저ID
    // 등록은 post요청이라 FORM(HTML5) or AJAX로만 요청 가능
    const {id, pwd, name, nick, email, hint} = req. body;
    try {
        const users = await userModle.addUser(id, pwd, name, nick, email, hint);
        // 사용자 정보를 모두 조회해서 users라는 변수에 담아. 당장. 얼른.
       if (users) {
        res.status(200).json ({
            status: 'success',
            massage: "사용자 등록 성공",
            redirect: "/"
        }) 
       } else {
        res.status(500).json ({
            status: "fail",
            massage: "실패. 다시."
        });
       }        
       res.status(200).json ({
        code: 201,
        status: true,
        massage: "사용자 등록 성공"
       })
    } catch (err) {
    console.log(err);
    res.status(500).json ({
        code:501,
        status: false,
        massage: "데이터베이스 연결 실패"
        })
    }
}
// Object(객체) : 여러가지 변수, 값, 함수, 클래스 등 여러가지 정보를
// 포함할 수 있는  자바 스크립트 데이터 타입
const userController = {
    getAllUsers,
    getOneUser,
    addUser
}

export default userController;
