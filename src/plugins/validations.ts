import { extend } from "vee-validate";
import {
	required,
	min_value as minValue,
	min,
	max_value as maxValue,
	max,
} from "vee-validate/dist/rules";
import i18n from "./i18n";

extend("required", {
	...required,
	message: (_, values) =>
		i18n.t("common.validations.required", values).toString(),
});
extend("min_value", {
	...minValue,
	message: (_, values) =>
		i18n.t("common.validations.min_value", values).toString(),
});
extend("min", {
	...min,
	message: (_, values) => i18n.t("common.validations.min", values).toString(),
});
extend("max", {
	...max,
	message: (_, values) => i18n.t("common.validations.max", values).toString(),
});
extend("max_value", {
	...maxValue,
	message: (_, values) =>
		i18n.t("common.validations.max_value", values).toString(),
});
