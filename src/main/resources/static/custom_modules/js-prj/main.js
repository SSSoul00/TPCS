/**
 * Created by yejf on 2015/1/22.
 *
 */
function delClass(id){
    var y = confirm("你确定要删除此班级吗?");
    if(y){
        //执行删除的逻辑
        alert("你要删除的班级ID是："+id);
    }
}

function deleteStu(id){
    alert("删除学员");
}

/******
 * 切换添加学员时的 “更多”输入框
 */
function showMore(){
    $("#more").slideToggle(500);
}

function showCRMInfo(){
    $("#crmInfo").slideToggle(500);
}

function gotoUpdateStu(){
    //转到更新学员信息页面
    window.location.href = "../student/upd_student.html";
}

function gotoUpdateProject(id){
    //转到更新项目案例页面
    window.location.href = "upd_project-v2.html";
}

/******
 * 添加员工时切换 “更多信息”
 */
function showMoreEmpInfo(){
    $("#moreEmpInfo").slideToggle(500);
}

function showPasswordInput(){
    $("#passwordInput").slideToggle(500);
}

