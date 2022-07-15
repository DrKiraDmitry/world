import {useContext} from "react";
import {MobXProviderContext} from "mobx-react";
import {RootStore} from "src/stores/RootStore";

export const useRootStore = () => (useContext(MobXProviderContext) as { rootStore: RootStore }).rootStore;
