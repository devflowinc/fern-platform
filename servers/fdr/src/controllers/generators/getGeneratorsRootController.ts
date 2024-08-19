import { GeneratorsService } from "../../api/generated/api/resources/generators/service/GeneratorsService";
import { FdrApplication } from "../../app";

export function getGeneratorsRootController(app: FdrApplication): GeneratorsService {
    return new GeneratorsService({
        upsertGenerator: async (req, res) => {
            await app.services.auth.checkUserBelongsToOrg({
                authHeader: req.headers.authorization,
                orgId: "fern",
            });

            await app.dao.generators().upsertGenerator({ generator: req.body });
            return res.send();
        },
        getGenerator: async (req, res) => {
            return res.send(await app.dao.generators().getGenerator({ generatorId: req.params.generator_id }));
        },
        listGenerators: async (_, res) => {
            return res.send(await app.dao.generators().listGenerators());
        },
    });
}