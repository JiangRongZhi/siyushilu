(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{1190:function(e,o,r){"use strict";r.r(o);r(65),r(40),r(33),r(27),r(54),r(50);var t=r(28),l=r(29),n=r(2);function c(object,e){var o=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),o.push.apply(o,r)}return o}var m={layout:"aijinke",data:function(){var e=this;return{activeName:"first",activeIndex:"1",infoForm:{name:"李媛媛",sex:"1",date1:"1985-2-2",professionName:"市场营销",code:"007",lesson:"市场营销理论",classList:[],mphone:"180222111",email:"xxxx@163.com",character:"老师",userNo:"",xyName:"",classTree:[],teacherClassList:[]},ruleForm:{pass:"",checkPass:"",oldPass:""},rulesInfo:{},rules:{pass:[{validator:function(o,r,t){""===r?t(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),t())},trigger:"blur"}],checkPass:[{validator:function(o,r,t){""===r?t(new Error("请再次输入密码")):r!==e.ruleForm.pass?t(new Error("两次输入密码不一致!")):t()},trigger:"blur"}],oldPass:[{validator:function(e,o,r){""===o&&r(new Error("请输入旧密码"))},trigger:"blur"}]}}},created:function(){this.getUserDetails()},methods:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(source,!0).forEach((function(o){Object(t.a)(e,o,source[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(source).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(source,o))}))}return e}({},Object(l.b)("user",["getUserDetail","updateUserInfo"]),{getUserDetails:function(){var e=this;this.getUserDetail().then((function(o){if(o){e.infoForm.classTree=o.classTree[0].children,e.infoForm.teacherClassList=o.teacherClassList;var data=o.data;e.infoForm.tid=data.tid,e.infoForm.name=data.name,e.infoForm.email=data.email,e.infoForm.date1=data.birth,e.infoForm.code=data.code,e.infoForm.lesson=data.lesson,e.infoForm.professionName=data.professionName,e.infoForm.mphone=data.mphone,e.infoForm.userNo=data.userNo,e.infoForm.xyName=data.xyName,e.infoForm.classList=data.classList,1==o.type?e.infoForm.character="老师":e.infoForm.character="学生"}}))},resetPasswrod:function(e){this.$refs[e].validate((function(e){if(console.log(e),!e)return console.log("error submit!!"),!1;console.log("1111")}))},submitUserInfo:function(e){var o=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;"老师"==o.infoForm.character?o.updateUserInfo(o.infoForm).then((function(e){0==e.code&&n.a.successMessage("修改成功！")})):console.log("学生")}))}})},f=r(13),component=Object(f.a)(m,(function(){var e=this,o=e.$createElement,r=e._self._c||o;return r("div",{staticClass:"uc-center-wrap"},[r("div",{staticClass:"main"},[r("el-container",[r("el-aside",{attrs:{width:"260px"}},[r("div",{staticClass:"aside-panel"},[r("div",{staticClass:"aside-avatar"},[r("img",{attrs:{src:"/image/avatar.png",alt:""}})]),e._v(" "),r("ul",{staticClass:"uc-grid"},[r("li",[r("span",[e._v("姓名：")]),e._v("\n              "+e._s(e.infoForm.name)+"\n            ")]),e._v(" "),r("li",[r("span",[e._v("角色：")]),e._v("\n              "+e._s(e.infoForm.character)+"\n            ")]),e._v(" "),r("li",[r("span",[e._v("账号：")]),e._v("\n              "+e._s(e.infoForm.userNo)+"\n            ")]),e._v(" "),r("li",[r("span",[e._v("学校：")]),e._v("\n              "+e._s(e.infoForm.xyName)+"\n            ")]),e._v(" "),r("li",[r("span",[e._v("授课专业：")]),e._v("\n              "+e._s(e.infoForm.professionName)+"\n            ")])])])]),e._v(" "),r("el-main",[r("div",{staticClass:"col-panel"},[r("div",{staticClass:"main-panel form-panel"},[r("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(o){e.activeName=o},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"账户信息",name:"first"}},[r("el-form",{ref:"infoForm",staticClass:"panelForm",attrs:{model:e.infoForm,rules:e.rulesInfo,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{attrs:{disabled:""},model:{value:e.infoForm.name,callback:function(o){e.$set(e.infoForm,"name",o)},expression:"infoForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"性别",prop:"sex"}},[r("el-radio-group",{model:{value:e.infoForm.sex,callback:function(o){e.$set(e.infoForm,"sex",o)},expression:"infoForm.sex"}},[r("el-radio",{attrs:{label:"1"}},[e._v("男")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("女")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"生日",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date1"}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.infoForm.date1,callback:function(o){e.$set(e.infoForm,"date1",o)},expression:"infoForm.date1"}})],1)],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"授业专业",prop:"professionName"}},[r("el-input",{model:{value:e.infoForm.professionName,callback:function(o){e.$set(e.infoForm,"professionName",o)},expression:"infoForm.professionName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"授课课程",prop:"lesson"}},[r("el-input",{model:{value:e.infoForm.lesson,callback:function(o){e.$set(e.infoForm,"lesson",o)},expression:"infoForm.lesson"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"授课班级",prop:"classlist"}},[r("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.infoForm.classTree,props:{value:"id",multiple:!0},"show-all-levels":!1,clearable:""},model:{value:e.infoForm.teacherClassList,callback:function(o){e.$set(e.infoForm,"teacherClassList",o)},expression:"infoForm.teacherClassList"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"教师工号",prop:"code"}},[r("el-input",{attrs:{disabled:""},model:{value:e.infoForm.code,callback:function(o){e.$set(e.infoForm,"code",o)},expression:"infoForm.code"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号码",prop:"mphone"}},[r("el-input",{attrs:{disabled:""},model:{value:e.infoForm.mphone,callback:function(o){e.$set(e.infoForm,"mphone",o)},expression:"infoForm.mphone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{model:{value:e.infoForm.email,callback:function(o){e.$set(e.infoForm,"email",o)},expression:"infoForm.email"}})],1),e._v(" "),r("div",{staticClass:"form-footer"},[r("el-button",{attrs:{type:"success"},on:{click:function(o){return e.submitUserInfo("infoForm")}}},[e._v("保存")])],1)],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:"修改密码",name:"second"}},[r("el-form",{ref:"ruleForm",staticClass:"passForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"150px"}},[r("el-form-item",{attrs:{label:"输入原密码",prop:"oldPass"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.oldPass,callback:function(o){e.$set(e.ruleForm,"oldPass",o)},expression:"ruleForm.oldPass"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"输入新密码",prop:"pass"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.pass,callback:function(o){e.$set(e.ruleForm,"pass",o)},expression:"ruleForm.pass"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"再次输入新密码",prop:"checkPass"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(o){e.$set(e.ruleForm,"checkPass",o)},expression:"ruleForm.checkPass"}})],1),e._v(" "),r("div",{staticClass:"form-footer"},[r("el-button",{attrs:{type:"success"},on:{click:function(o){return e.resetPasswrod("ruleForm")}}},[e._v("提交")])],1)],1)],1)],1)],1)])])],1)],1)])}),[],!1,null,null,null);o.default=component.exports}}]);