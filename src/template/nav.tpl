<div class="layout bg hidden-l">
    <div class="container-layout height-big">
        <span class="float-right"><a href="#">注册</a> <span class="text-little text-gray">|</span>
            <a href="#">登录</a> <span class="text-little text-gray">|</span> <a href="#">联系</a>
        </span>欢迎登录盛通OA系统
    </div>
</div>
<div class="container-layout padding-big-top padding-big-bottom bg-main bg-inverse">
    <div class="line">
        <div class="xl12 xs2 xm2 xb1">
            <button class="button icon-navicon float-right" data-target="#header-demo3">
            </button>
            <img width="50px" src="../@@if (level == 2){../}images/logo2.png" />
        </div>
        <div class=" xl12 xs10 xm10 xb11 padding-top nav-navicon" id="header-demo3">
            <div class="xs8 xm8 xb6">
                <ul class="nav nav-menu nav-inline">
                    <li @@if (modal == "index") {class='active'}><a href="@@if (level == 2){../}index.html">首页</a> </li>
                    <li @@if (modal == "contacts") {class='active'}><a href="@@if (level == 2){../}contacts.html">企业通讯录</a> </li>
                    <li @@if (modal == "annous") {class='active'}><a href="@@if (level == 2){../}annous.html">综合公告</a> </li>
                    <li @@if (modal == "user") {class='active'}>
                        <a href="#">个人中心<span class="arrow"></span></a>
                        <ul class="drop-menu">
                            <li><a href="#"><i class="icon icon-user"></i> 个人信息</a> </li>
                            <li><a href="#"><i class="icon icon-pencil"></i> 录入订单</a> </li>
                            <li><a href="@@if (level == 2){../}user/leave.html"><i class="icon icon-pencil"></i> 我要请假</a> </li>
                            <li><a href="#"><i class="icon icon-bookmark"></i> 我的任务</a></li>
                            <li><a href="#"><i class="icon icon-spinner"></i> 待我处理</a></li>
                        </ul>
                    </li>

                    <li @@if (modal == "admin") {class='active'}>
                        <a href="#">管理中心<span class="arrow"></span></a>
                        <ul class="drop-menu">
                            <li><a href="#"><i class="icon icon-pencil"></i> 发布任务</a> </li>
                            <li><a href="#"><i class="icon icon-list"></i> 订单列表</a></li>
                            <li><a href="#"><i class="icon icon-bookmark"></i> 任务列表</a></li>
                            <li>
                                <a href="#"><i class="icon icon-file"></i> 数据统计<span class="arrow"></span></a>
                                <ul>
                                    <li><a href="@@if (level == 2){../}admin/sign.html">考勤统计</a></li>
                                    <li><a href="@@if (level == 2){../}admin/resource.html">业绩统计</a></li>
                                </ul>
                            </li>
                            <li><a href="#"><i class="icon icon-wrench"></i> 权限管理</a> </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="xs4 xm4 xb3">
                <!-- <form>
                <div class="input-group padding-little-top">
                    <input type="text" class="input border-main" name="keywords" size="30" placeholder="关键词" />
                    <span class="addbtn">
                        <button type="button" class="button bg">
                            搜!</button></span>
                </div>
                </form> -->
            </div>
            <div class="hidden-s hidden-m xb2 xb1-move">
                <div class="xl6 xb12 text-red"></div>
                <div class="xl6 xb12 text-small">
                    <a href="#" class="win-homepage">设为首页</a> | <a href="#" class="win-favorite">加入收藏</a>
                </div>
            </div>
        </div>
    </div>
</div>