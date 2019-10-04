import { ReactiveSocket } from "rsocket-types";
import { RSocketRPCServices } from "game-idl";
import ExtrasService from "../ExtrasService";
import { Extra } from "game-idl";
import { Flux } from "reactor-core-js/flux";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import FlowableAdapter from "../FlowableAdapter";

export default class ExtrasServiceClientAdapter implements ExtrasService {

    private service: RSocketRPCServices.ExtrasService;

    constructor(rSocket: ReactiveSocket<any, any>) {
        this.service = new RSocketRPCServices.ExtrasServiceClient(rSocket);
    }

    extras(): Flux<Extra.AsObject> {
        return Flux.from<Extra>(FlowableAdapter.wrap(this.service.extras(new Empty()) as any))
            .map(extra => extra.toObject());
    }
}