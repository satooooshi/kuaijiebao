package pl.piomin.services.boot;


import org.springframework.beans.factory.annotation.Autowired;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.logging.Log;
import org.springframework.context.annotation.Bean;
import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import pl.piomin.services.boot.data.*;
import pl.piomin.services.boot.model.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {
    protected final Log logger = LogFactory.getLog(getClass());

    @Autowired
    CalenderUserRepository repository;

    @Autowired
    UserSpecRepository usrepository;

    @Autowired
    AfRepository afrepository;

    @Autowired
    DebtRepository debtRepository;

    @Autowired
    FpRepository fpRepository;

    @Autowired
    FpdealRepository fpdealRepository;

    @Autowired
    BankcardRepository bcRepository;

    @Autowired
    QuestionRepository questionRepository;


    @Override
    public void run(String... args) throws Exception {
        logger.info("KuaiJieBao System Started.");


        CalendarUser satoshi=new CalendarUser(111,"Satoshi","Aikawa","example@qq.com","impassword");
        repository.save(satoshi);
        UserSpec spec=new UserSpec("111",111,"Imaddress","Imincome","imwork","image","imdescription",55f);
        usrepository.save(spec);

        LocalDateTime now = LocalDateTime.now();
        AssetFlow flo=new AssetFlow("111",111,"111",1500f,"OUT",now.minusWeeks(2));
        afrepository.save(flo);
        AssetFlow flo2=new AssetFlow("222",111,"111",1500f,"IN",now.minusMonths(2));
        afrepository.save(flo2);
        Debt debtSubmitted=new Debt("111",111,Status.SUBMITTED);
        Debt debtAccepted=new Debt("222",111,Status.ACCEPTED);
        debtRepository.save(debtSubmitted);
        debtRepository.save(debtAccepted);

        FP fp=new FP("111","P&G",3.3360,7,
                "111",1000,"middle",now,"P&G",now,"imdescription");
        fpRepository.save(fp);

        FPDeal fpdeal=new FPDeal("111",111,"111");
        fpdealRepository.save(fpdeal);

        Bankcard card=new Bankcard("111",111,"1111222233334444","aikawa satoshi","123","12/12",now);
        bcRepository.save(card);


        Integer[] a = new Integer[]{1,2,3};
        List<Integer> lst = Arrays.asList(a);
        Question que=new Question("111","imtitle","imanswer",lst);
        questionRepository.save(que);




    }






    }





//http://books.google.com/books/content?id=oqmBpk1EzvAC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE711QBNtaIUSwWq78rKS255V9UdZGGvCLPHFe71mqh1MU9KhM2TmFFpSYInEoAmDyH43DB7HlgMn2RQD5Ui6zQNPIyNcyEAdDJmGcaBifZjypTM97qrD1I0Mcvq_U2_QW8VW_23J&source=gbs_api