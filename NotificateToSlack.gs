/**
Description:
Backlogの課題が追加・更新された時にSlackに通知をするスクリプト
*/

function doPost(e) {
  var type = e.parameter.type;
  var ticketPrefix = "";
  var projectName = e.parameter.project.name;
  var projectKey = e.parameter.project.projectKey;
  var id = e.parameter.project.id;
  var createUserName = e.parameter.createdUser.name;
  var createDate = e.parameter.created;
  
  var backlogUrl = "https://dist0mix.backlog.jp/";
  var keyNumber = projectKey + "-" + id + " ";
  
  // 課題が追加されたのか更新されたのかを判別
  switch(type) {
    case 1:
      ticketPrefix = "課題の追加　";
      break;
    case 2,3:
      ticketPrefix = "課題の更新　";
      break;
    default:
      break;
  }
  
  // 投稿メッセージの整形
  var message = ticketPrefix + keyNumber + backlogUrl + "view/" + keyNumber + "作成者：" + createUserName + "　作成日：" + createDate;
  
  // Slackに投稿
  toSlackPostMessage(message);
}

/**
 *Slackにメッセージを投稿する
 * @message 投稿する本文
 */
function toSlackPostMessage(message) {
  
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var slackApp = SlackApp.create(token); //SlackAPP　インスタンス生成
  
  var options = {
    channelId: "@sktake", //投稿先のチャンネルID/名
    userName: "通知するマン" //投稿時のユーザーの名前
};
  
  slackApp.postMessage(options.channelId, message, {username: options.userName});
}
