'use strict';//宣言後の記述ミスの表示
//Idを使って要素の取得
const userNameInput=document.getElementById('user-name');
const assesssmentButton=document.getElementById('assessment');
const resultDivided=document.getElementById('result-area');
const tweetDivided=document.getElementById('tweet-area');
/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素 
 */
function removeAllChildren(element){
    while(element.firstChild){//子供の要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assesssmentButton.onclick=()=>{//onclick=function(){}(無名関数)と同じ
    console.log('ボタンが押されました');
    const userName=userNameInput.value;//テキストエリアに入力された文字列の受け取り
    if(userName.length===0){//空の時は終了する
        return;
    }
    console.log(userName);

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header=document.createElement('h3');//要素を作成する;まず要素(<h3>)を作成、プロパティを用いてタグの中身を変更できる
    header.innerText='診断結果';//内側のテキスト
    resultDivided.appendChild(header);//<h3>の見出し
    const paragraph=document.createElement('p');
    const result=assesssment(userName);
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);
    
    //ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor=document.createElement('a');
    const hrefValue='https://twitter.com/intent/tweet?button_hashtag='
        +encodeURIComponent('あなたのいいところ')
        +'&ref_src=twsrc%5Etfw';//Twitterボタンサイトで作ったURI
    /**
     * URI;インターネット上などにある情報やサービスを一意に識別するためのデータ形式
     * https;スキーム,twitter.com;ホスト名,/intent/tweet;リソース名,?以降;クエリ
     * encodeURIComporoneent(文字列);文字列をURIエンコードに変換
     */
    anchor.setAttribute('href',hrefValue);
    anchor.className='twitter-hashtsg-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText='Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    //widgets.js;
    const script=document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widget.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown=(event)=>{
    if(event.key=='Enter'){
        assesssmentButton.onclick();
    }
}
const answers=[//定数
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方ないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}のいいところは知識です。{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気に掛けて貰った多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、分かり合えることができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。ヤバイと思った時にしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。 '
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assesssment(userName){
    /* 全文字のコード番号を取得してそれを足し合わせる*/
    let sumOfCharCode=0;//letは{}で囲まれた中での利用
    for(let i=0;i<userName.length;i++){
        sumOfCharCode=sumOfCharCode+userName.charCodeAt(i);//charCodeAt(i);i番目文字コードの数値
    }
    //文字コード番号の合計を回答の数で割って添え字の数値を求める
    const index=sumOfCharCode%answers.length;
    let result=answers[index];
    //{userName}をユーザーの名前に置き換える
    result=result.replace(/\{userName\}/g,userName);//正規表現;様々な文字列の表示
    return result;
}
//テストコード
console.assert(
    assesssment('太郎')==='太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の特定の部分を名前に置き換える処理が間違えています。'
);//間違い指摘
console.assert(
    assesssment('太郎')==assesssment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
