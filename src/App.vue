<template>
    <div id="deck">
    <div v-if="isActive">
    <button v-on:click="createMyDeck">手札を作る</button>
    </div>
    <div v-else>
        <input type="checkbox" v-model="isChange[0]">
        <label for="checkbox" id="0">{{ myDeck[0]%13+1 }}{{ mySuit[0] }}</label>
        <input type="checkbox" v-model="isChange[1]">
        <label for="checkbox" id="1">{{ myDeck[1]%13+1 }}{{ mySuit[1] }}</label>
        <input type="checkbox" v-model="isChange[2]">
        <label for="checkbox" id="2">{{ myDeck[2]%13+1 }}{{ mySuit[2] }}</label>
        <input type="checkbox" v-model="isChange[3]">
        <label for="checkbox" id="3">{{ myDeck[3]%13+1 }}{{ mySuit[3] }}</label>
        <input type="checkbox" v-model="isChange[4]">
        <label for="checkbox" id="4">{{ myDeck[4]%13+1 }}{{ mySuit[4] }}</label>

        <button v-on:click="deckChange">手札を変える</button>
    </div>
    <div id="role">
        <button v-on:click="AllRoleJudge">判定</button>
    </div>
  </div>
</template>
<script>
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
        OnePair_judge:false
      }
    },
    
    created:function(){
        for(var i=0;i<53;i++){
            this.Deck.push(i)
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
        },
        createMyDeck:function(event){//手札を作る
            for(var i=0;i<5;i++){
                var num=Math.floor(Math.random()*this.Deck.length)//デッキのインデックスを乱数で
                this.myDeck[i]=this.Deck[num]//該当インデックスの要素を手札に入れる
                this.Deck.splice(num,1)//手札に入れたものをデッキから削除する
            }
            this.desideSuit()
            this.isActive=!this.isActive
            //テストケースはここに記述する
        },
        
        //商、余をだす関数
        deckChange:function(event){//手札を変える
            //指定された添字のカードを再度乱数から数字を得る
            for(var i=0;i<5;i++){
                if(this.isChange[i]){
                    var num=Math.floor(Math.random()*this.Deck.length)//デッキのインデックスを乱数で
                    this.myDeck.splice(i,1,this.Deck[num])
                    this.Deck.splice(num,1)//手札に入れた$ものをデッキから削除する
                    this.mySuit.splice(i,1,this.suit[Math.floor(this.myDeck[i]/13)])
                }
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
        }
    }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
