import { Component, OnInit } from "@angular/core";
import { IForm } from "../../interfaces/IForm";
import { FormBuilder } from "../../models/FormBuilder";

@Component({
  selector: "app-formbuilder",
  templateUrl: "./formbuilder.component.html",
  styleUrls: ["./formbuilder.component.css"]
})
export class FormbuilderComponent implements OnInit {
  forms: Array<IForm> = [];
  currSelectedForm: IForm;

  viewFormDetail(onSelectedRow: IForm) {
    this.currSelectedForm = onSelectedRow;
    console.log(
      "[FormbuilderComponent::viewFormDetail] : currSelectedForm : ",
      JSON.stringify(this.currSelectedForm)
    );
  }

  submitIForm(form: IForm) {
    console.log(
      "[FormbuilderComponent::submitIForm] : form : ",
      JSON.stringify(form)
    );
  }

  ngOnInit() {
    //TODO : should get somewhere in store-redux
    this.forms.push(new FormBuilder("Employee"));
    this.forms.push(new FormBuilder("Department"));
    this.forms.push(new FormBuilder("Address"));
  }
}
