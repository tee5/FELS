
document.addEventListener("DOMContentLoaded", e => {
    document.querySelector("#exec_ls").addEventListener("click", onClickExecLSButton);
});

/** ExecLSボタン押下時の処理 */
function onClickExecLSButton() {
    let dirpath = document.querySelector("#dirpath").value.replace(/(^\s+|\s+$)/g, "");
    if (dirpath === "") {
        window.alert("dirctory pathが空欄です");
        return;
    }
    let options = [];
    if (document.querySelector("#option_a").checked) {
        options.push("a");
    }
    if (document.querySelector("#option_l").checked) {
        options.push("l");
    }
    execLs(dirpath, options);
}

/** 引数で渡されたディレクトリのLS結果を文字列で返す
 * @param {string} address 
 * @returns {string}
 */
function execLs(dirpath ,options=[]) {
    const childProcess = window.require("child_process");
    let command = "ls ";
    
    if (options.length !== 0) {
        command += `-${options.join("")} `;
    }
    command += dirpath;
    childProcess.exec(command, {cwd: __dirname}, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error) {
            console.error(`[ERROR] ${error}`);
            return;
        }
        document.querySelector("#output").value = [command, "----------------", stdout].join("\n");
    });
    return "??";
}
