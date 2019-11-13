<template>
    <div id="main">
    <div id="main-header">
        <h1>Yasshieeee's Porker</h1>
    </div>
    <div id="main_body" style="height:700px;">
    <el-dialog :visible.sync="visible">
        <h2>Welcome to Yasshieeee's porker!</h2>
    <img src="@/assets/begin_dialog/cat_koubakozuwari_brown.png" style="width:200px;height:auto">
    <p>遊んでいくニャ〜</p>
    <div slot="footer" class="dialog-footer" style="text-align:center;">
      <el-button type="primary" @click="visible = false" style="width:50%">遊ぶ!</el-button>
    </div>
  </el-dialog>
  
    <div v-if="isActive">
        <table id="play_table" border="1" align="center">
            <tr id="card_space">
                <td class="card"></td>
                <td class="card"></td>
                <td class="card"></td>
                <td class="card"></td>
                <td class="card"></td>
            </tr>
            <tr id="button_space">
                <td></td><td></td><td></td><td></td><td></td>
            </tr>
        </table>
    <el-button type="primary" v-on:click="createMyDeck" style="margin:20px;width:200px;">Create my Deck!</el-button>
    </div>
    <div v-else>
        <table id="play_table" border="1" align="center">
            <tr id="card_space">
                <td class="card">
                    <img :src=first_card>
                </td>
                <td class="card">
                    <img :src=second_card>
                </td>
                <td class="card">
                    <img :src=third_card>
                </td>
                <td class="card">
                    <img :src=forth_card>
                </td>
                <td class="card">
                    <img :src=fifth_card>
                </td>
            </tr>
            <tr id="button_space">
                <td>
                    <div v-if="isChange[0]">
                        <el-checkbox v-model="isChange[0]">CHANGE!</el-checkbox>
                    </div>
                    <div v-else>
                        <el-checkbox v-model="isChange[0]">CHANGE?</el-checkbox>
                    </div>
                </td>
                <td>
                    <div v-if="isChange[1]">
                        <el-checkbox v-model="isChange[1]">CHANGE!</el-checkbox>
                    </div>
                    <div v-else>
                        <el-checkbox v-model="isChange[1]">CHANGE?</el-checkbox>
                    </div>
                </td>
                <td>
                    <div v-if="isChange[2]">
                        <el-checkbox v-model="isChange[2]">CHANGE!</el-checkbox>
                    </div>
                    <div v-else>
                        <el-checkbox v-model="isChange[2]">CHANGE?</el-checkbox>
                    </div>
                </td>
                <td>
                    <div v-if="isChange[3]">
                        <el-checkbox v-model="isChange[3]">CHANGE!</el-checkbox>
                    </div>
                    <div v-else>
                        <el-checkbox v-model="isChange[3]">CHANGE?</el-checkbox>
                    </div>
                </td>
                <td>
                    <div v-if="isChange[4]">
                        <el-checkbox v-model="isChange[4]">CHANGE!</el-checkbox>
                    </div>
                    <div v-else>
                        <el-checkbox v-model="isChange[4]">CHANGE?</el-checkbox>
                    </div>
                </td>
            </tr>
        </table>
        <!--label for="checkbox" id="0">{{ myDeck[0]%13+1 }}{{ mySuit[0] }}</label>
        <label for="checkbox" id="1">{{ myDeck[1]%13+1 }}{{ mySuit[1] }}</label>
        <label for="checkbox" id="2">{{ myDeck[2]%13+1 }}{{ mySuit[2] }}</label>
        <label for="checkbox" id="3">{{ myDeck[3]%13+1 }}{{ mySuit[3] }}</label>
        <label for="checkbox" id="4">{{ myDeck[4]%13+1 }}{{ mySuit[4] }}</label-->
        <div id="operations" style="margin-top:20px;margin-buttom:20px;">
            <p id="typing" style="height:50px;"></p>
            <div style="height:50px;">
                <div v-if="exchange_phase>0" style="display:inline-block;">
                    <el-button class="ope_button" type="primary" v-on:click="deckChange" style="margin:10px;">Change Cards!</el-button>
                </div>
                <div v-else style="display:inline-block;">
                    <el-button disabled class="ope_button" type="primary" v-on:click="deckChange" style="margin:10px;">Change Cards!</el-button>
                </div>
                <el-button class="ope_button" type="primary" v-on:click="AllRoleJudge" style="margin:10px;">Ready</el-button>
            </div>
        </div>
    </div>
  </div>
  <div id="main-footer" style="width:100%;height:200px;background-color:#DCDFE6;padding:20px;margin-top:20px;">
    <div id="sponcer" style="width:50%;display: inline-block;">
    <p>トランプ<br><a href="https://pixabay.com/ja/users/WikimediaImages-1185597/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=884206">WikimediaImages</a>による<a href="https://pixabay.com/ja/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=884206">Pixabay</a>からの画像</p>
    </div>
    <div id="icon_space" style="height:100px;width:10%;vertical-align: middle;text-align:center;float:right;margin:20px;display: inline-block;">
        <div><a href="https://github.com/YaCpotato" style="font-size:20px;"><img src="@/assets/begin_dialog/GitHub-Mark-64px.png" style="width:50px;height:auto;"></a></div>
        <div><a href="https://twitter.com/Yasshieeee"><img src="@/assets/begin_dialog/Twitter_Logo_Blue.png" style="width:80px;height:auto;object-fit: cover;"></a></div>
    </div>
  </div>
</div>
</template>
<script>
import element from 'element'
export default{
    data(){
      return{
        Deck:[],
        myDeck:[],
        mySuit:[],
        isActive:true,
        isChange:[false,false,false,false,false],
        suit:['♠︎','♣︎','♡','♢'],
        mySuit:[],
        Flash_judge:false,
        Straight_judge:false,
        RoyalStraight_judge:false,
        FourCard_judge:false,
        FullHouse_judge:false,
        ThreeCard_judge:false,
        TwoPair_judge:false,
        OnePair_judge:false,
        first_card_path:'',
        second_card_path:'',
        third_card_path:'',
        forth_card_path:'',
        fifth_card_path:'',
        exchange_phase:3,
        visible:false,
        players_role:''
      }
    },
    
    created:function(){
        for(var i=0;i<53;i++){
            this.Deck.push(i)
        }
        this.visible=true 
    },
    watch:{
        visible:function(val,oldval){
            if(!val){
                this.$toasted.show("ようこそ！楽しんでいってください！");
                this.$toasted.show("カードを引きましょう！");
            }
        },
        exchange_phase:function(val,oldval){
            if(val == 2){
                this.$toasted.show("２回目に交換するカードを選んでください！");
            }else if(val == 1){
                this.$toasted.show("３回目に交換するカードを選んでください！");
            }else if(val == 0){
                this.$toasted.show("さあ！勝負です！");
            }
        }
    },
    methods:{
      Flash:function(){//フラッシュ判定
            var m=Math.floor(this.myDeck[0]/13)//自分のデッキの1枚目のカードの１３で割った商
            for(var i=1;i<5;i++){
                if(m!=Math.floor(this.myDeck[i]/13)){
                    return 0;
                }
            }
            this.Flash_judge=true
        },

        Straight:function(){
            var i=0
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.myDeck[i]%13)
            }
            surplus.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            for(var i=4;i>=1;i--){
                if(surplus[i]!=surplus[i-1]+1){
                    return 0;
                }
                if(i==1){
                    this.Straight_judge=true
                }
            }
            
            if(surplus[4]!=12 || surplus[0]!=0){
                return 0;
            }else if(surplus[4]==12 || surplus[0]==0){
                this.Straight_judge=false
            }
            if(surplus[4]-surplus[0]!=4){
                this.RoyalStraight_judge=false
                return 0;
            }
        },

        FourCard:function(){//４カード・・・剰余が等しいカードが4枚
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.myDeck[i]%13)
            }
            surplus.sort(
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus[i]]=suit[surplus[i]]+1
            }

            for(var j=0;j<13;j++){
                if(suit[j]==4){
                    this.FourCard_judge=true
                }
            }
        },

        FullHouse:function(){
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.myDeck[i]%13)
            }
            surplus.sort(
                function(a,b){
                    return a-b;
            }
            )
            for(var i=0;i<4;i++){
                if(surplus[i]!=surplus[i+1]){//1枚目、2枚目が等しかったら
                    return 0;//等しくなければ終わり
                }else if(i==0){
                    if(surplus[i+1]==surplus[i+2]){//2枚目、3枚目をみる
                            if(surplus[i+3]!=surplus[i+4]){//3枚目と4枚目,4枚目と5枚目を確認する
                                return 0;//等しくなければ終わり
                            }
                        this.FullHouse_judge=true//等しかったら、昇順に並べたときに、3枚、2枚となるフルハウス
                    }else if(surplus[i+1]!=surplus[i+2]){
                        i=2
                    }
                }
            }
            this.FullHouse_judge=true
        },
        ThreeCard:function(){
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.myDeck[i]%13)
            }
            surplus.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus[i]]=suit[surplus[i]]+1
            }

            var pair=0
            for(var j=0;j<13;j++){
                if(suit[j]==3){
                    this.ThreeCard_judge=true
                }
            }
        },
        Pair:function(){
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.myDeck[i]%13)
            }
            surplus.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus[i]]=suit[surplus[i]]+1
            }

            var pair=0
            for(var j=0;j<13;j++){
                if(suit[j]==2){
                    pair=pair+1
                }
            }
            if(pair==2){
                this.TwoPair_judge=true
                return 0;
            }else if(pair==1){
                this.TwoPair_judge=false
                this.OnePair_judge=true
                return 0;
            }
            
        },
        AllRoleJudge:function(){
            this.Flash_judge=false
            this.Straight_judge=false
            this.RoyalStraight_judge=false
            this.FourCard_judge=false
            this.FullHouse_judge=false
            this.ThreeCard_judge=false
            this.TwoPair_judge=false
            this.OnePair_judge=false
            this.Flash()
            this.Straight()
            this.FourCard()
            this.FullHouse()
            this.ThreeCard()
            this.Pair()

            if(this.Flash_judge && this.RoyalStraight_judge){
                this.players_role = 'Royal Straight Flash!!'
            }else if(this.RoyalStraight_judge){
                this.players_role = 'Royal Straight!!'
            }else if(this.Straight_judge){
                this.players_role = 'Straight!!'
            }else if(this.Flash_judge){
                this.players_role = 'Flash!!'
            }else if(this.FourCard_judge){
                this.players_role = 'Four Card!!'
            }else if(this.FullHouse_judge){
                this.players_role = 'Full House!!'
            }else if(this.ThreeCard_judge){
                this.players_role = 'Three Card!!'
            }else if(this.TwoPair_judge){
                this.players_role = 'Two Pair!!'
            }else if(this.OnePair_judge){
                this.players_role = 'One Pair!!'
            }
        },
        createMyDeck:function(event){//手札を作る
            for(var i=0;i<5;i++){
                var num=Math.floor(Math.random()*this.Deck.length)//デッキのインデックスを乱数で
                this.myDeck[i]=this.Deck[num]//該当インデックスの要素を手札に入れる
                this.Deck.splice(num,1)//手札に入れたものをデッキから削除する
            }
            this.desideSuit()
            this.isActive=!this.isActive
            this.$toasted.show("１回目に交換するカードを選んでください！");
        },
        
        //商、余をだす関数
        deckChange:function(event){//手札を変える
        this.exchange_phase -= 1
        var change = false
            //指定された添字のカードを再度乱数から数字を得る
            for(var i=0;i<5;i++){
                if(this.isChange[i]){
                    change = true
                    var num=Math.floor(Math.random()*this.Deck.length)//デッキのインデックスを乱数で
                    this.myDeck.splice(i,1,this.Deck[num])
                    this.Deck.splice(num,1)//手札に入れた$ものをデッキから削除する
                    this.mySuit.splice(i,1,this.suit[Math.floor(this.myDeck[i]/13)])
                }
            }
            if(change){
                this.$toasted.show("新しいカードがきましたよ！");
            }
        },
        desideSuit:function(){
            for(var i=0;i<5;i++){
                var num=Math.floor(this.myDeck[i]/13)
                if(num==0){
                    this.mySuit.push(this.suit[0])
                }else if(num==1){
                    this.mySuit.push(this.suit[1])
                }else if(num==2){
                    this.mySuit.push(this.suit[2])
                }else if(num==3){
                    this.mySuit.push(this.suit[3])
                }
            }
        },
    },
    watch:{
        players_role:function(val){
            function typing(str = val){
                let buf = document.getElementById("typing").innerHTML; //書き込み済みの文字を要素から取得
                let writed = buf.length; //書き込み済みの文字数を取得
                let write = "";
                if(writed < str.length){
                    write = str.charAt(writed); //1文字だけ取得する
                }else{
                    buf = ""; //今回は何度も繰り返すために内容を消去します
                }
                document.getElementById("typing").innerHTML = buf + write; //1文字だけ追加していく
            }

            const str = document.getElementById("typing").innerHTML; //書き込む文字を要素から取得
            const delay = 200 //1文字が表示される時間

            document.getElementById("typing").innerHTML = "";
            window.setInterval(function(){typing(val);}, delay);
        }
    },
    computed:{
        first_card:function(){
          return require("@/assets/trumps/"+this.myDeck[0]+".png")
        },
        second_card:function(){
          return require("@/assets/trumps/"+this.myDeck[1]+".png")
        },
        third_card:function(){
          return require("@/assets/trumps/"+this.myDeck[2]+".png")
        },
        forth_card:function(){
          return require("@/assets/trumps/"+this.myDeck[3]+".png")
        },
        fifth_card:function(){
          return require("@/assets/trumps/"+this.myDeck[4]+".png")
        },
    }
}
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Acme&display=swap");
#main{
    font-family: 'Acme', sans-serif;
    vertical-align: middle;
    text-align: center;
}
#play_table{
    border-collapse: collapse;
    background-color: darkgreen;
}
#operations{
    margin:20px;
}
.ope_button{
    width:200px;
    margin-right:10px;
    margin-left:10px;
}

.card{
    height:400px;
    width:20vw;
}

#button_space > td:nth-child(1) > div > label{
    width:20vw;
    background-color:darkgreen;
    border:none;
    color:white;
    font-size:20px;
    font-weight:bold;
}
#button_space > td:nth-child(2) > div > label{
    width:20vw;
    background-color:darkgreen;
    border:none;
    color:white;
    font-size:20px;
    font-weight:bold;
}
#button_space > td:nth-child(3) > div > label{
    width:20vw;
    background-color:darkgreen;
    border:none;
    color:white;
    font-size:20px;
    font-weight:bold;
}
#button_space > td:nth-child(4) > div > label{
    width:20vw;
    background-color:darkgreen;
    border:none;
    color:white;
    font-size:20px;
    font-weight:bold;
}
#button_space > td:nth-child(5) > div > label{
    width:20vw;
    background-color:darkgreen;
    border:none;
    color:white;
    font-size:20px;
    font-weight:bold;
}
</style>
