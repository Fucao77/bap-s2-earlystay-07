const parser = require('fast-xml-parser');

/**
 *
 * @param {PrismaClient} prisma
 * @param {String} ceto
 * @returns
 */
exports.convertCeto = async function (prisma, ceto) {
  const productSchemas = [],
    deliverySchemas = [],
    destinationSchemas = [],
    optionSchemas = [],
    optionDescriptionSchemas = [],
    optionDescriptionParagraphSchemas = [],
    optionDescriptionParagraphObjSchemas = [],
    commercialInfoSchemas = [],
    commercialInfoLesPlusSchemas = [],
    commercialInfoLesPlusParagraphSchemas = [],
    commercialReservationSchemas = [],
    productCodes = [];

  const cetoData = parser.parse(ceto, {
    parseAttributeValue: true,
    ignoreAttributes: false,
  });

  cetoData.fournisseur.catalogue.produits.produit.forEach((product) => {
    const productId =
      product.informations_generiques.references.interne_to.libelle;
    productCodes.push(productId);
    productSchemas.push({
      code: String(product['@_numero']),
      name: product.nom_produit.libelle,
      sale:
        product.informations_generiques.identification_produit.vente['@_value'],
      option:
        product.informations_generiques.identification_produit.formule[
          '@_value'
        ],
      presentable_alone:
        product.informations_generiques.identification_produit.presentable_seul[
          '@_value'
        ],
      with_delivery:
        product.informations_generiques.identification_produit
          .avec_acheminement['@_value'],
      interne_to: productId,
    });

    deliverySchemas.push({
      product_code: productId,
      number:
        product.informations_generiques.acheminement.prestation['@_numero'],
      direction:
        product.informations_generiques.acheminement.prestation.sens['@_value'],
      service_type:
        product.informations_generiques.acheminement.prestation.type_prestation[
          '@_value'
        ],
      inclusion:
        product.informations_generiques.acheminement.prestation.inclusion[
          '@_value'
        ],
      way:
        product.informations_generiques.acheminement.prestation.moyen[
          '@_value'
        ],
      departure_city:
        product.informations_generiques.acheminement.prestation.ville_depart
          .ville.iata['@_value'],
    });

    destinationSchemas.push({
      product_code: productId,
      number:
        product.informations_generiques.destinations.destination['@_numero'],
      city:
        product.informations_generiques.destinations.destination.arrivee.ville
          .iata['@_value'],
    });

    optionSchemas.push({
      id: productId,
      product_code: productId,
      accomodation_type:
        product.informations_formule.sejour_ville.hebergement_sejour
          .type_hebergement['@_value'],
      accomodation_name:
        product.informations_formule.sejour_ville.hebergement_sejour
          .nom_hebergement.libelle,
      theme_to:
        product.informations_formule.sejour_ville.thematique.theme_to[
          '@_value'
        ],
      theme_ceto:
        product.informations_formule.sejour_ville.thematique.theme_ceto[
          '@_value'
        ],
    });

    const optionDescriptionId =
      productId + product.informations_formule.descriptif['@_numero'];

    optionDescriptionSchemas.push({
      id: optionDescriptionId,
      option_id: productId,
      number: product.informations_formule.descriptif['@_numero'],
      small_picto:
        product.informations_formule.descriptif.picto.objet.petit['#text'],
      big_picto:
        product.informations_formule.descriptif.picto.objet.grand['#text'],
    });

    product.informations_formule.descriptif.paragraphe.forEach((para) => {
      const id = optionDescriptionId + para['@_numero'];

      optionDescriptionParagraphSchemas.push({
        id: id,
        description_id: optionDescriptionId,
        number: para['@_numero'],
        title: para.titre,
        text: para.texte,
      });
      if (Array.isArray(para.objet)) {
        para.objet.forEach((obj) => {
          optionDescriptionParagraphObjSchemas.push({
            paragraph_id: id,
            number: obj['@_numero'],
            small: obj.petit['#text'],
            big: obj.grand['#text'],
            legende: obj.legende,
            type: obj['@_type_objet'],
          });
        });
      }
    });

    commercialInfoSchemas.push({
      id: productId,
      product_code: productId,
      catch_phrase:
        product.informations_commerciales.presentation_commerciale
          .accroche_liste.libelle,
    });

    commercialInfoLesPlusSchemas.push({
      id:
        productId +
        product.informations_commerciales.lesplus.descriptif['@_numero'],
      info_id: productId,
      number: product.informations_commerciales.lesplus.descriptif['@_numero'],
    });

    commercialInfoLesPlusParagraphSchemas.push({
      info_plus_id:
        productId +
        product.informations_commerciales.lesplus.descriptif['@_numero'],
      title:
        product.informations_commerciales.lesplus.descriptif.paragraphe.titre,
      text:
        product.informations_commerciales.lesplus.descriptif.paragraphe.texte,
      number:
        product.informations_commerciales.lesplus.descriptif.paragraphe[
          '@_numero'
        ],
    });

    product.informations_commerciales.reservations.reservation.forEach(
      (resa) => {
        commercialReservationSchemas.push({
          info_id: productId,
          type: resa.type_reservation['@_value'],
          media: resa.media_reservation.libelle,
          comment: resa.commentaires_reservation.libelle,
          number: resa['@_numero'],
        });
      }
    );
  });

  await prisma.products.createMany({ data: productSchemas });
  await prisma.delivery_services.createMany({ data: deliverySchemas });
  await prisma.destinations.createMany({ data: destinationSchemas });
  await prisma.options.createMany({ data: optionSchemas });
  await prisma.option_descriptions.createMany({
    data: optionDescriptionSchemas,
  });
  await prisma.option_description_paragraphs.createMany({
    data: optionDescriptionParagraphSchemas,
  });
  await prisma.option_description_paragraph_objects.createMany({
    data: optionDescriptionParagraphObjSchemas,
  });
  await prisma.commercial_infos.createMany({ data: commercialInfoSchemas });
  await prisma.commercial_info_plus.createMany({
    data: commercialInfoLesPlusSchemas,
  });
  await prisma.commercial_info_plus_paragraphs.createMany({
    data: commercialInfoLesPlusParagraphSchemas,
  });
  await prisma.commercial_reservations.createMany({
    data: commercialReservationSchemas,
  });

  return { cetoData, productCodes };
};
