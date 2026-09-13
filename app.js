(function () {
  var notes = {
    far: "容积率：地上总建筑面积 ÷ 用地面积。洽谈阶段常和限高、绿地率一起谈，直接决定能盖多少。",
    area: "建筑面积：按当地规范计量的房屋面积，影响造价、销售和报建口径，不能和占地面积混用。",
    land: "土地使用权：谁有权在这块地上开发、用多久、能否抵押或转让，合同里必须写清。",
    red: "规划红线：地块不可越界的控制线。红线图没确认，后面设计和报建都会停。",
    epc: "EPC 是工程总承包：设计、采购、施工由一方统筹，避免三家各干各的对不上。",
    share: "投资比例：各方出多少钱、占多少权益。例如决策 #008：中方 55%，中亚方 45%。",
    jv: "股权合作：双方成立合资公司持股做项目，和纯承包、代建不是同一种模式。",
    permit: "项目审批：土地、规划、建设许可等政府手续。驾驶舱里的延期，经常卡在这一环。",
    presale: "预售：未竣工先售。各地监管差很大，政策文件要用文件助手对照当前地块。",
    accept: "竣工验收：工程按许可和规范验收通过，才能交付和结算。"
  };

  var noteEl = document.getElementById("term-note");
  var terms = document.querySelectorAll(".term");

  terms.forEach(function (btn) {
    btn.addEventListener("click", function () {
      terms.forEach(function (b) {
        b.classList.remove("on");
      });
      btn.classList.add("on");
      if (noteEl) {
        noteEl.textContent = notes[btn.getAttribute("data-term")] || "";
        noteEl.classList.add("show");
      }
    });
  });

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var ids = links.map(function (a) {
    return a.getAttribute("href").slice(1);
  });

  function setActive() {
    var y = window.scrollY + 96;
    var current = ids[0];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  document.querySelectorAll(".folder").forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      document.querySelectorAll(".folder").forEach(function (other) {
        if (other !== d) other.removeAttribute("open");
      });
    });
  });
})();
