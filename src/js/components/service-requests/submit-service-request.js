import { API } from "../../api";
import { FullWidthGrid } from "../grid";
import { ServiceRequestSubmitted } from "./service-request-submitted";
import { getFieldset, getLabel, getLegend } from "../../utils/element-factory";

export class SubmitServiceRequest {
  constructor() {
    const api = new API();

    const $form = $("<form />", {
      name: "submit-service-request",
      method: "post",
      action: "",
    });
    const $formInputTmpl = $(".components .input-field:eq(0)");
    const $requiredFieldsNote = $(".components .form-item .form-label").clone();
    const $textAreaTmpl = $(".components .form__input-field--large");

    const $serviceAreaFieldset = getFieldset();
    const $serviceAreaLegend = getLegend("Service area of request");
    const $suburbLabel = getLabel("Suburb");
    const $suburbInput = $formInputTmpl.clone().attr({
      id: "suburb",
      name: "suburb",
      type: "text",
      placeholder: "",
    });

    $serviceAreaFieldset.append([
      $serviceAreaLegend,
      $suburbLabel,
      $suburbInput,
    ]);

    const $addressFieldset = getFieldset();
    const $addressLegend = getLegend("Address");

    const $streetNameLabel = getLabel("Street name");
    const $streetNameInput = $formInputTmpl.clone().attr({
      id: "street-name",
      name: "street_name",
      placeholder: "",
    });

    const $streetNumberLabel = getLabel("Street Number");
    const $streetNumberInput = $formInputTmpl.clone().attr({
      id: "street-number",
      name: "street_number",
      type: "number",
      placeholder: "",
    });

    $addressFieldset.append([
      $addressLegend,
      $streetNameLabel,
      $streetNameInput,
      $streetNumberLabel,
      $streetNumberInput,
    ]);

    const $yourInfoFieldset = getFieldset();
    const $yourInfoLegend = getLegend("Your information");

    const $firstNameLabel = getLabel("First name *");
    const $firstNameInput = $formInputTmpl.clone().attr({
      id: "first-name",
      name: "user_name",
      placeholder: "",
      required: true,
    });

    const $lastNameLabel = getLabel("Last name *");
    const $lastNameInput = $formInputTmpl.clone().attr({
      id: "last-name",
      name: "user_surname",
      placeholder: "",
      required: true,
    });

    const $cellNumberLabel = getLabel("Cellphone number");
    const $cellNumberInput = $formInputTmpl.clone().attr({
      id: "cellphone-number",
      name: "user_mobile_number",
      placeholder: "",
      type: "tel",
    });

    const $emailLabel = getLabel("Email address");
    const $emailInput = $formInputTmpl.clone().attr({
      id: "email-address",
      name: "email_address",
      placeholder: "",
      type: "email",
    });

    const $describeIssueLabel = getLabel("Describe your issue");
    const $describeIssueTextarea = $textAreaTmpl.clone().attr({
      id: "describe-your-issue",
      name: "description",
      placeholder: "Please describe your issue",
    });

    const $submitButton = $(".components .button.button--form-submit")
      .clone()
      .attr({
        value: "Submit",
      });

    $yourInfoFieldset.append([
      $yourInfoLegend,
      $firstNameLabel,
      $firstNameInput,
      $lastNameLabel,
      $lastNameInput,
      $cellNumberLabel,
      $cellNumberInput,
      $emailLabel,
      $emailInput,
      $describeIssueLabel,
      $describeIssueTextarea,
      $submitButton,
    ]);

    $requiredFieldsNote.text("* Required fields");

    $form.append([
      $requiredFieldsNote,
      $serviceAreaFieldset,
      $addressFieldset,
      $yourInfoFieldset,
    ]);

    $submitButton.on("click", (event) => {
      event.preventDefault();
      api
        .submitServiceRequest($form.serialize())
        .then((response) => {
          console.log(response);
          this.$element.empty().append(new ServiceRequestSubmitted().render());
        })
        .fail((a, b) => console.error(a, b));
    });

    this.$element = new FullWidthGrid([$form]).render();
  }

  render() {
    return this.$element;
  }
}
