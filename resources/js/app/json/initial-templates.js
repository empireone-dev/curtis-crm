import { get_email_template_by_id_service } from "../services/email-template-service";

export async function warranty_initial(ticket) {
    const result = await get_email_template_by_id_service(64);
    return result.data;
    // return `<p><strong style="color: rgb(47, 84, 150); background-color: transparent;">Hi,</strong></p><p><br></p><p>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">Good day!</strong></p><p><br></p><p>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">Thank you for your call.</strong></p><p><br></p><p>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">For us to serve you better, we will need the following information.
    // </strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148);">1.&nbsp; &nbsp; A clear and readable picture of the bill of sale. 
    // Please note the bill of sale must show the following:</strong></p><p><strong style="color: rgb(11, 83, 148);">a. Store Name and Address <em>
    // *except if purchased online</em></strong></p><p><strong style="color: rgb(11, 83, 148);">b. Date of Purchase</strong></p><p><strong style="color: rgb(11, 83, 148);">
    // c. Item description</strong></p><p><strong style="color: rgb(11, 83, 148);">d. Unit Price</strong></p><p><strong style="color: rgb(11, 83, 148);">e. Total amount paid
    // </strong></p><p><strong style="color: rgb(255, 0, 0);">If you do not have the bill of sale, you may try contacting the dealer's customer care department for added support.
    // </strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">2.&nbsp; &nbsp; A clear picture of the front of the unit 
    // (</strong><strong style="color: rgb(255, 0, 0); background-color: transparent;">for TV's, a full-frontal image with the TV turned on is required and all edges must be visible
    // </strong><strong style="color: rgb(11, 83, 148); background-color: transparent;">)</strong></p><p><br></p><p>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">3.&nbsp; &nbsp; A clear view of the rear of the unit (</strong>
    //     <strong style="color: rgb(255, 0, 0); background-color: transparent;">All edges must be visible</strong><strong style="color: rgb(11, 83, 148); background-color: transparent;">)&nbsp;&nbsp;</strong>
    //     </p><p><br></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">
    //     4.&nbsp; &nbsp; A clear and readable picture of the model # and serial # sticker (</strong>
    //         <strong style="color: rgb(255, 0, 0); background-color: transparent;">located on the back of the unit</strong>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">)&nbsp;&nbsp;&nbsp;&nbsp;</strong></p><p><br></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">5.&nbsp; &nbsp; A clear picture/video clip showing the defect/issue
    //         </strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">6.&nbsp; &nbsp; A detailed explanation of the defect/issue
    //         </strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">Also, kindly include filling out the information below :&nbsp;
    //         </strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148);">Name: ________________________</strong></p><p><strong style="color: rgb(11, 83, 148);">
    //         Address: ______________________ </strong><strong style="color: rgb(255, 0, 0); background-color: transparent;">*<em>must be physical address&nbsp;</em></strong>
    //         </p><p><strong style="color: rgb(11, 83, 148);">City: __________________________</strong>
    //         </p><p><strong style="color: rgb(11, 83, 148);">State/Province: _________________</strong></p><p><strong style="color: rgb(11, 83, 148);">
    //         Zip/Postal Code: ________________</strong></p><p><strong style="color: rgb(11, 83, 148);">Phone #: _______________________</strong></p><p>
    //         <strong style="color: rgb(34, 34, 34);">&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148);">
    //         An email with warranty instructions will be provided to you as soon as we receive the complete documentation as required above.</strong></p><p><br></p>
    //         <p><strong style="color: rgb(255, 0, 0);">&nbsp;** Please ensure that the Case File Number is in the subject line **&nbsp;&nbsp;</strong></p><p><br></p><p><br>
    //         </p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">Thank you.</strong></p><p><br></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Best Regards,</strong></p><p><br></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Customer Support</strong></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Curtis International Ltd.</strong></p><p><br></p><p>
    //         <span style="color: rgb(0, 71, 178);">_______________________________________________________________________________________________________________</span></p>
    //         <p><br></p><p><br></p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">Salut,</strong></p><p><br></p><p>
    //         <strong style="background-color: transparent; color: rgb(11, 83, 148);">Bonne journée!</strong></p><p><br></p><p><br></p><p>
    //         <strong style="background-color: transparent; color: rgb(11, 83, 148);">Merci pour votre appel.</strong></p><p><br></p><p><br></p><p>
    //         <strong style="background-color: transparent; color: rgb(11, 83, 148);">Pour que nous puissions mieux vous servir, nous aurons besoin des informations suivantes.</strong>
    //         </p><p><br></p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">1. Une image claire et lisible de l’acte de vente. Veuillez noter que l'acte de vente doit indiquer les éléments suivants :</strong>
    //         </p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">a. Nom et adresse du magasin *sauf si acheté en ligne
    //         </strong></p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">b. Date d'achat</strong></p>
    //         <p><strong style="background-color: transparent; color: rgb(11, 83, 148);">c. Description de l'article</strong></p><p>
    //         <strong style="background-color: transparent; color: rgb(11, 83, 148);">d. Prix ​​unitaire</strong></p><p>
    //         <strong style="background-color: transparent; color: rgb(11, 83, 148);">e. Montant total payé</strong></p><p>
    //         <strong style="background-color: transparent; color: rgb(255, 0, 0);">
    //         Si vous n'avez pas l'acte de vente, vous pouvez essayer de contacter le service client du concessionnaire pour obtenir une assistance supplémentaire.
    //         </strong></p><p><br></p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">2. Une image claire de l'avant de l'appareil 
    //         (</strong><strong style="background-color: transparent; color: rgb(255, 0, 0);">pour les téléviseurs, une image frontale complète avec le téléviseur allumé est requise et 
    //         tous les bords doivent être visibles</strong><strong style="background-color: transparent; color: rgb(11, 83, 148);">)</strong></p>
    //         <p><br></p><p><br></p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">3. Une vue dégagée de l'arrière de l'appareil
    //          (</strong><strong style="background-color: transparent; color: rgb(255, 0, 0);">tous les bords doivent être visibles</strong>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">)&nbsp;&nbsp;</strong></p><p><br></p><p><br></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">4. Une image claire et lisible de l'autocollant numéro de modèle et numéro de série 
    //          (</strong><strong style="background-color: transparent; color: rgb(255, 0, 0);">situé à l'arrière de l'appareil</strong>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">)&nbsp;&nbsp;&nbsp;&nbsp;</strong></p><p><br></p><p><br></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">5. Une image/un clip vidéo clair montrant le défaut/le problème</strong></p>
    //          <p><br></p><p><br></p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">6. Une explication détaillée du défaut/problème</strong>
    //          </p><p><br></p><p><br></p><p><strong style="background-color: transparent; color: rgb(11, 83, 148);">
    //          Merci également de bien vouloir remplir les informations ci-dessous :&nbsp;</strong></p><p><br></p><p><br></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">Nom: ________________________</strong></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">Adresse : _____________________ </strong>
    //          <strong style="background-color: transparent; color: rgb(255, 0, 0);">*doit être une adresse physique&nbsp;</strong></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">Ville:&nbsp; ________________________</strong></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">État/Province :&nbsp; ________________</strong></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">Zip / code postal:&nbsp; ______________</strong></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">Téléphone #:&nbsp; &nbsp; _________________</strong></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">&nbsp;</strong></p><p>
    //          <strong style="background-color: transparent; color: rgb(11, 83, 148);">Un e-mail contenant les instructions de garantie vous sera fourni dès que nous
    //           recevrons la documentation complète requise ci-dessus.</strong></p><p><br></p><p><strong style="background-color: transparent; color: rgb(255, 0, 0);">
    //           &nbsp;** Veuillez vous assurer que le numéro de dossier figure dans la ligne d'objet **&nbsp;&nbsp;</strong></p><p><br></p><p><br></p><p>
    //           <strong style="background-color: transparent; color: rgb(11, 83, 148);">Merci.</strong></p><p><br></p><p><br></p><p>
    //           <strong style="background-color: transparent; color: rgb(11, 83, 148);">Cordialement,</strong></p><p><br></p><p><br></p><p>
    //           <strong style="background-color: transparent; color: rgb(11, 83, 148);">Service client</strong></p><p>
    //           <strong style="background-color: transparent; color: rgb(11, 83, 148);">Curtis International Ltd.</strong></p>`;
}
export async function parts_initial(ticket) {
    // return `<p><strong style="color: rgb(11, 83, 148); background-color: transparent;">Hi,</strong></p><p><br></p><p>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">Thank you for informing us.</strong></p><p><br></p><p>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">For us to assist you better, please provide the following:</strong></p><p><br>
    // </p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">1. &nbsp; &nbsp; &nbsp; Clear Picture of the&nbsp; Model# 
    // (</strong><strong style="color: rgb(255, 0, 0); background-color: transparent;">It is located on the back of the unit.</strong>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">)</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">
    // 2. &nbsp; &nbsp; &nbsp; Clear Picture of the Serial# (</strong><strong style="color: rgb(255, 0, 0); background-color: transparent;">It is located on the back of 
    // the unit. A sticker is written as S/N.: A****************</strong><strong style="color: rgb(11, 83, 148); background-color: transparent;"> 
    // (</strong><strong style="color: rgb(255, 0, 0); background-color: transparent;">Starts with letter "A" followed by 16 digits with a barcode.</strong>
    // <strong style="color: rgb(11, 83, 148); background-color: transparent;">)</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">
    // 3. &nbsp; &nbsp; &nbsp; Clear copy of your receipt showing the store name, date of purchase, item description and order summary with the total breakdown. (</strong>
    //     <strong style="color: rgb(255, 0, 0); background-color: transparent;">it is only applicable for newly purchased unit</strong><strong style="color: rgb(11, 83, 148);
    //      background-color: transparent;">)</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">4. &nbsp; &nbsp; &nbsp; Description of the 
    //      part that you’re looking for.</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">5. &nbsp; &nbsp; &nbsp; Clear picture of the 
    //      part/s you need.</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">6. &nbsp; &nbsp; &nbsp; Clear photo of the unit in which 
    //      the missing/damaged part is located.</strong></p><p><br></p><p><strong style="color: rgb(255, 0, 0); background-color: transparent;">**Note: We only need a sample
    //       picture of the part to fully identify what is missing or needed to resolve the issue.**</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: 
    //       transparent;">&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">Also, please kindly fill out the information below
    //        including the City:</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148);
    //         background-color: transparent;">Name: ____________________________</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">
    //         Address: __________________________ </strong><strong style="color: rgb(255, 0, 0); background-color: transparent;">*<em>must be physical address&nbsp;</em>
    //         </strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">City:&nbsp; _____________________________</strong></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">State/Province: ____________________</strong></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Zip/Postal code:&nbsp; ___________________</strong></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Phone#:&nbsp; __________________________</strong></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148); background-color: transparent;">
    //         We will then advise you of our support options that will be available to you.&nbsp;</strong></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">&nbsp;</strong></p><p><strong style="color: rgb(255, 0, 0);">** Please ensure 
    //         that the Case File Number is in the subject line **&nbsp;&nbsp;</strong></p><p><br></p><p><br></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Thank you.</strong></p><p><br></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Customer Support</strong></p><p>
    //         <strong style="color: rgb(11, 83, 148); background-color: transparent;">Curtis International Ltd.</strong></p><p><br></p><p>
    //         <strong style="color: rgb(0, 71, 178);">__________________________________________________________________________________________________________________________
    //         </strong></p><p><br></p><p><br></p><p><strong style="color: rgb(11, 83, 148);">Salut,</strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148);">
    //         Merci de nous informer.</strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148);">Afin que nous puissions mieux vous aider, veuillez fournir les
    //          éléments suivants :</strong></p><p><br></p><p><strong style="color: rgb(11, 83, 148);">1. Image claire du numéro de modèle 
    //          (</strong><strong style="color: rgb(255, 0, 0);">il est situé à l'arrière de l'appareil.</strong><strong style="color: rgb(11, 83, 148);">)</strong></p>
    //          <p><strong style="color: rgb(11, 83, 148);">2. Image claire du numéro de série (</strong><strong style="color: rgb(255, 0, 0);">
    //          il est situé à l'arrière de l'appareil. Un autocollant est écrit comme S/N. : A******************</strong><strong style="color: rgb(11, 83, 148);"> (</strong>
    //             <strong style="color: rgb(255, 0, 0);">commence par une lettre "A" suivi de 16 chiffres avec un code-barres.</strong><strong style="color: rgb(11, 83, 148);">)
    //             </strong></p><p><strong style="color: rgb(11, 83, 148);">3. Copie claire de votre reçu indiquant le nom du magasin, la date d'achat, la description de l'article 
    //             et le récapitulatif de la commande avec le détail total. (</strong><strong style="color: rgb(255, 0, 0);">cela ne s'applique qu'aux unités nouvellement achetées
    //             </strong><strong style="color: rgb(11, 83, 148);">)</strong></p><p><strong style="color: rgb(11, 83, 148);">4. Description de la pièce que vous recherchez.
    //             </strong></p><p><strong style="color: rgb(11, 83, 148);">5. Image claire de la ou des pièces dont vous avez besoin.</strong></p><p>
    //             <strong style="color: rgb(11, 83, 148);">6. Photo claire de l'unité dans laquelle se trouve la pièce manquante/endommagée.</strong></p><p><br></p><p><br></p>
    //             <p><strong style="color: rgb(255, 0, 0);">**Remarque : Nous n'avons besoin que d'un exemple d'image de la pièce pour identifier pleinement ce qui manque ou 
    //             ce qui est nécessaire pour résoudre le problème.**</strong></p><p><strong style="color: rgb(11, 83, 148);">&nbsp;</strong></p><p>
    //             <strong style="color: rgb(11, 83, 148);">Merci également de bien vouloir remplir les informations ci-dessous en incluant la Ville :</strong></p><p>
    //             <strong style="color: rgb(11, 83, 148);">&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148);">Nom: ____________________________</strong></p>
    //             <p><strong style="color: rgb(11, 83, 148);">Adresse : __________________________ </strong><strong style="color: rgb(255, 0, 0);">*
    //             doit être une adresse physique&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148);">Ville:&nbsp; _____________________________</strong>
    //             </p><p><strong style="color: rgb(11, 83, 148);">État/Province : ____________________</strong></p><p><strong style="color: rgb(11, 83, 148);">
    //             Zip / code postal:&nbsp; ___________________</strong></p><p><strong style="color: rgb(11, 83, 148);">Téléphone#:&nbsp; __________________________
    //             </strong></p><p><strong style="color: rgb(11, 83, 148);">&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148);">
    //             Nous vous informerons ensuite des options d'assistance qui s'offrent à vous.&nbsp;</strong></p><p><strong style="color: rgb(11, 83, 148);">
    //             &nbsp;</strong></p><p><strong style="color: rgb(255, 0, 0);">** Veuillez vous assurer que le numéro de dossier figure dans la ligne d'objet 
    //             **&nbsp;&nbsp;</strong></p><p><br></p><p><br></p><p><strong style="color: rgb(11, 83, 148);">Merci.</strong></p><p><br></p><p><br></p><p>
    //             <strong style="color: rgb(11, 83, 148);">Service client</strong></p><p><strong style="color: rgb(11, 83, 148);">Curtis International Ltd.</strong></p>`;
    const result = await get_email_template_by_id_service(63);
    return result.data;
}
