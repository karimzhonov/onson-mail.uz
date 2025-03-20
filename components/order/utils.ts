import { FilePlus2, PlaneTakeoff, PlaneLanding, PackageSearch, Truck, Check } from "lucide-vue-next";


export const order_steps = [
    {
      step: "create_time",
      title: "Создан",
      description: "Заказ создан и готовится к отправке.",
      icon: FilePlus2,
    },
    {
      step: "departure_datetime",
      title: "В аэропорту отправителя",
      description: "Заказ проходит осмотр в аэропорту отправителя.",
      icon: PlaneTakeoff,
    },
    {
      step: 'enter_uzb_datetime',
      title: "В аэропорту Узбекистана",
      description: "Заказ готовится к таможенному оформлению.",
      icon: PlaneLanding,
    },
    {
      step: 'process_customs_datetime',
      title: "На таможенном осмотре",
      description:
        "Заказ проходит таможенное оформление и вскоре будет направлен на доставку.",
      icon: PackageSearch,
    },
    {
      step: "process_local_datetime",
      title: "В процессе доставки",
      description: "Заказ находится в процессе доставки и скоро будет у вас.",
      icon: Truck,
    },
    {
      step: "process_received_datetime",
      title: "Доставлен",
      description: "Заказ успешно доставлен.",
      icon: Check,
    },
  ];