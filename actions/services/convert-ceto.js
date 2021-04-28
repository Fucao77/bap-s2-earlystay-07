const parser = require('fast-xml-parser');
const PromisePool = require('es6-promise-pool');
/**
 *
 * @param {PrismaClient} prisma
 * @param {String} ceto
 * @returns
 */
exports.convertCeto = async function (prisma, ceto) {
  const productSchemas = [];
  const productCodes = [];

  const cetoData = parser.parse(ceto, {
    parseAttributeValue: true,
    ignoreAttributes: false,
  });

  const promiseProducer = function* () {
    for (const index in cetoData.fournisseur.catalogue.produits.produit) {
      const product = cetoData.fournisseur.catalogue.produits.produit[index];

      const productId =
        product.informations_generiques.references.interne_to.libelle;

      productCodes.push(productId);

      yield prisma.products.create({
        data: {
          name: product.nom_produit.libelle,
          sale:
            product.informations_generiques.identification_produit.vente[
              '@_value'
            ],
          option:
            product.informations_generiques.identification_produit.formule[
              '@_value'
            ],
          presentable_alone:
            product.informations_generiques.identification_produit
              .presentable_seul['@_value'],
          with_delivery:
            product.informations_generiques.identification_produit
              .avec_acheminement['@_value'],
          interne_to: productId,
          accomodation_type:
            product.informations_formule.sejour_ville.hebergement_sejour
              .type_hebergement['@_value'],
          accomodation_name:
            product.informations_formule.sejour_ville.hebergement_sejour
              .nom_hebergement.libelle,
          small_picto:
            product.informations_formule.descriptif.picto.objet.petit['#text'],
          big_picto:
            product.informations_formule.descriptif.picto.objet.grand['#text'],
          plus_title:
            product.informations_commerciales.lesplus.descriptif.paragraphe
              .titre,
          plus_value:
            product.informations_commerciales.lesplus.descriptif.paragraphe
              .texte,
          reservation_url:
            product.informations_commerciales.reservations.reservation[0]
              .media_reservation.libelle,
          reservation_tel:
            product.informations_commerciales.reservations.reservation[1]
              .media_reservation.libelle,
          theme_to:
            product.informations_formule.sejour_ville.thematique.theme_to[
              '@_value'
            ],
          theme_ceto:
            product.informations_formule.sejour_ville.thematique.theme_ceto[
              '@_value'
            ],
          catch_phrase:
            product.informations_commerciales.presentation_commerciale
              .accroche_liste.libelle,
          delivery_services: {
            create: {
              // product_code: productId,
              direction:
                product.informations_generiques.acheminement.prestation.sens[
                  '@_value'
                ],
              service_type:
                product.informations_generiques.acheminement.prestation
                  .type_prestation['@_value'],
              inclusion:
                product.informations_generiques.acheminement.prestation
                  .inclusion['@_value'],
              way:
                product.informations_generiques.acheminement.prestation.moyen[
                  '@_value'
                ],
              departure_city:
                product.informations_generiques.acheminement.prestation
                  .ville_depart.ville.iata['@_value'],
            },
          },
          options: {
            create: product.informations_formule.descriptif.paragraphe.map(
              (para) => ({
                number: para['@_numero'],
                title: para.titre,
                text: para.texte,
                images: {
                  create:
                    para.objet && Array.isArray(para.objet)
                      ? para.objet.map((obj) => ({
                          small: obj.petit['#text'],
                          big: obj.grand['#text'],
                          legende: obj.legende,
                          type: obj['@_type_objet'],
                        }))
                      : [],
                },
              })
            ),
          },
        },
      });
    }
  };

  const pool = new PromisePool(
    promiseProducer(),
    Number(process.env.PROMISE_MAX_CONCURRENCE) || 10
  );

  await pool.start();

  return { cetoData, productCodes };
};
