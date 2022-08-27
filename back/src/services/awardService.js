import { User, Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid"; //unique id 생성
import jwt from "jsonwebtoken";

class awardService{
    static async addAward({writer, title, description}){
        //writer는 currentUserId를 값으로 받아옴 >> 이를 통해 유저를 찾는다는 그건데 굳이 필요 없을 듯?
        //currentUserId는 uuid를 통해 발급 >> 겹칠일이 거의 없음 + 확인도 필요 없음 >> User를 참조할 필요 없음
        //상의 이름이 같을 수도 있으니까 titleID를 통해서만 확인이 가능하면 된다.
        console.log(`writer : ${writer}, title : ${title}, description : ${description}`)

        if( !writer){
            const errorMessage = 
                "작성자가 존재하지 않습니다"
            return {errorMessage}
        }else if(!title){
            const errorMessage = 
                "상 이름이 존재하지 않습니다"
            return {errorMessage}
        }


        const awardID = uuidv4();
        const newAward = {id : awardID, writer_id : writer, title : title, description:description};

        const createNewAward = await Award.create({newAward});
        createNewAward.errorMessage = null;
        //문제 없으므로 null
        
        return createNewAward;
    }

    static async readAllAward({writer}){
        console.log(`writer : ${writer}`);
        console.log(typeof(writer))
        if( !writer){
            const errorMessage = 
                "작성자가 존재하지 않습니다"
            return {errorMessage}
        }
        //writer로 변수를 전달하게 되면 findAll함수안에 {writer : 값}의 object형태로 전달된다.
        const allAward = await Award.findAll({writer})
        allAward.errorMessage = null;
        return allAward
    }
}

export { awardService };