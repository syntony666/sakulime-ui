import { registerPack } from "@sakulime-ui/core/icons";
import lucide from "@iconify-json/lucide/icons.json";

// icon packs are consumer-registered — the package ships the lookup
// machinery only; demos feed it lucide's Iconify JSON
registerPack("lucide", lucide);
