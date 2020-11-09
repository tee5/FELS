
document.addEventListener("DOMContentLoaded", e => {
    document.querySelector("#dirpath").addEventListener("keyup", updateCommandPreview);
    document.querySelectorAll("input[type=checkbox]").forEach(checkbox => checkbox.addEventListener("change", updateCommandPreview));
    document.querySelector("#exec_ls").addEventListener("click", onClickExecLSButton);
    updateCommandPreview();
});

/** ExecLSボタン押下時の処理 */
function onClickExecLSButton() {
    let dirpath = document.querySelector("#dirpath").value.replace(/(^\s+|\s+$)/g, "");
    if (dirpath === "") {
        window.alert("dirctory pathが空欄です");
        return;
    }
    let command = generateLsCommand();
    execCommand(command);
}

/** 引数で渡されたディレクトリのLS結果を文字列で返す
 * @param {string} command 
 * @returns {string}
 */
function execCommand(command) {
    const childProcess = window.require("child_process");
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

/** フォームの内容を参照し、LSコマンドを生成する */
function generateLsCommand() {
    let dirpath = document.querySelector("#dirpath").value.replace(/(^\s+|\s+$)/g, "");
    let command = "ls ";

    let options = [];
    if (document.querySelector("#option_a").checked) {
        options.push("a");
    }
    if (document.querySelector("#option_l").checked) {
        options.push("l");
    }
    if (options.length !== 0) {
        command += `-${options.join("")} `;
    }
    command += dirpath;
    return command;
}

function updateCommandPreview() {
    let command = generateLsCommand();
    document.querySelector("#command_preview").value = command;
}
