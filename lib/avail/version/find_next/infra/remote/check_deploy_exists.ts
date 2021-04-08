import { newApi_CheckDeployExists } from "../../../../../z_details/api/avail/check_deploy_exists";
import { wrapRemote } from "../../../../../z_vendor/getto-application/infra/remote/helper";
import { CheckDeployExistsRemotePod } from "../../infra";

export function newCheckDeployExistsRemote(): CheckDeployExistsRemotePod {
    return wrapRemote(newApi_CheckDeployExists(), (err) => ({
        type: "infra-error",
        err: `${err}`,
    }))
}
