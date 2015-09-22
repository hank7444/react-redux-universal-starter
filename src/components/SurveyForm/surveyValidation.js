import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const surveyValidation = createValidator({
  name: [required, maxLength(10)],
  email: [required, email], // 會依照required, email去掃錯誤，只顯示第一個出現的錯誤, 所以順序跟錯誤出現順序有關
  occupation: maxLength(20) // single rules don't have to be in an array
});

// 不懂這邊為何要用LRU, 驗證的條件如果大於10個, 新增就把舊的丟掉很奇怪
// 目前看不出效果在哪裡@@
//export default surveyValidation;
export default memoize(10)(surveyValidation);

/*
LRU 圖解

    entry             entry             entry             entry        
    ______            ______            ______            ______       
   | head |.newer => |      |.newer => |      |.newer => | tail |      
   |  A   |          |  B   |          |  C   |          |  D   |      
   |______| <= older.|______| <= older.|______| <= older.|______|      

removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added


var c = new LRUCache(3);
c.put('adam', 29);
c.put('john', 26);
c.put('angela', 24);
c.toString();        // -> "adam:29 < john:26 < angela:24"
c.get('john');       // -> 26
// Now 'john' is the most recently used entry, since we just requested it
c.toString();        // -> "adam:29 < angela:24 < john:26"
c.put('zorro', 141); // -> {key:adam, value:29}
// Because we only have room for 3 entries, put-ing 'zorro' purged 'adam'
c.toString();        // -> "angela:24 < john:26 < zorro:141"
*/
