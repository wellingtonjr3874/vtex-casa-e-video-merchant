import { ProductDTO } from "../dto"
import { Product } from "./Product"
import { MOCK_PRODUCT_RESPONSE } from "./mock-product-response"

describe("product entity", () => {
  it("create product entity with success", () => {
    const EXPECTED_RESPONSE = {
      title: "Guarda Roupa Casal Nancy 6 Portas e 6 Gavetas Moderna Imbuia/Off White",
      price: 2449.9,
      sale_price: 2449.9,
      condition: "novo",
      description: "Guarda Roupa Casal Nancy 6 Portas e 6 Gavetas Moderna Para deixar seu dormitório mais organizado e com visual moderno o Guarda roupa Casal Nancy é ideal. Além de ser muito espaçoso é de ótima qualidade. Possui estrutura 100 MDF, corrediça telescópica em suas 6 gavetas, 4 cabideiros de alumínio e dobradiças amortecedoras que evitam o impacto ao fechar as portas. Além disso ainda possui os puxadores inteiriços em madeira com detalhe em frisos horizontais que dão aquele lindo visual ao produto. Impossível não se apaixonar! Dimensões: Largura: 278 cm Altura: 237,5 cm Profundidade: 56 cm Peso: 274,39 kg Garantia do Fornecedor: 3 meses Informações Importantes: Os objetos que ambientam as fotos não acompanham o produto. Não disponibilizamos a montagem do produto. O produto acompanha manual de montagem. Não nos responsabilizamos por danos no produto causados por montagem de qualquer outra forma que não seja a descrita no manual. Verifique as dimensões do produto e certifique-se que o percurso que ele fará até o local de uso permite sua passagem. Moderna Mobília reserva o direito de alterar as especificações técnicas sem prévio aviso. As medidas contidas no site podem sofrer variações de acordo com a montagem, tipo de costura etc. As tonalidades das cores podem sofrer alteração de acordo com a configuração de cada monitor.",
      gtin: "7908560527087",
      link: "https://www.casaevideo.com.br/guarda-roupa-casal-nancy-6-portas-e-6-gavetas-moderna-1597806/p?idsku=1533494",
      image_link: "https://casaevideodigital.vteximg.com.br/arquivos/ids/7569039/16866809361059.jpg?v=638223328857570000",
      brand: "Moderna",
      mpn: "1533494",
      installments: {
        months: 10,
        amount: 244.99
      },
      custom_label_0: "3P",
      custom_label_1: "CV235",
      custom_label_2: "MODERNA MOBILIA",
      availability: true,
      product_type: "Móveis > Quarto > Guarda Roupas e Roupeiros",
      offerId: "1597806_1533494"
    }

    const product = new Product({ product: MOCK_PRODUCT_RESPONSE as unknown as ProductDTO, selectedSku: "1533494", sellerId: "CV235", vendorAccount: "casaevideo" });

    expect(product.title).toEqual(EXPECTED_RESPONSE.title)
    expect(product.price).toEqual(EXPECTED_RESPONSE.price)
    expect(product.sale_price).toEqual(EXPECTED_RESPONSE.sale_price)
    expect(product.condition).toEqual(EXPECTED_RESPONSE.condition)
    expect(product.description).toEqual(EXPECTED_RESPONSE.description)
    expect(product.gtin).toEqual(EXPECTED_RESPONSE.gtin)
    expect(product.link).toEqual(EXPECTED_RESPONSE.link)
    expect(product.image_link).toEqual(EXPECTED_RESPONSE.image_link)
    expect(product.brand).toEqual(EXPECTED_RESPONSE.brand)
    expect(product.mpn).toEqual(EXPECTED_RESPONSE.mpn)
    expect(product.installments.amount).toEqual(EXPECTED_RESPONSE.installments.amount);
    expect(product.installments.months).toEqual(EXPECTED_RESPONSE.installments.months);
    expect(product.custom_label_0).toEqual(EXPECTED_RESPONSE.custom_label_0);
    expect(product.custom_label_1).toEqual(EXPECTED_RESPONSE.custom_label_1);
    expect(product.custom_label_2).toEqual(EXPECTED_RESPONSE.custom_label_2);
    expect(product.availability).toEqual(EXPECTED_RESPONSE.availability);
    expect(product.product_type).toEqual(EXPECTED_RESPONSE.product_type)
  })
})