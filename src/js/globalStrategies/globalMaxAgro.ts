// стратегия, при которой все оголтело бегут вперед и стреляют во все, что движется
import { GlobalSTRDefaultMethods } from "../lib/globalStrdefault"
export class GlobalSTRMaxAgro extends GlobalSTRDefaultMethods {
    constructor(props) {
        super(props);
    }
    // оценка ситуации, метод должен быть во всех стратегиях
    // должен учитывать множесвто значений и ситуациий, вообщем анализирует и предугадывает ситуации,
    // возможный урон от передвижение и прочее...

    assessment() {
        return 1;
    }
}