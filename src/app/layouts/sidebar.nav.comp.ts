import { Component } from "@angular/core";

@Component({
  selector: "sidebar-nav",
  templateUrl: "./sidebar.nav.comp.html",
  styleUrls: ["./sidebar.nav.comp.css"]
})
export class SideBarNavComp {
  title = "Angular - Router";
}

/*
<script type="text/javascript">
  $(document).ready(function() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar").toggleClass("active");
    });
  });
</script>

*/
