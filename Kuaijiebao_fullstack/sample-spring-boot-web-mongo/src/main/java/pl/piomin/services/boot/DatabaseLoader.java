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


        CalendarUser satoshi=new CalendarUser(111,"Satoshi","Aikawa","hello@qq.com","password");
        repository.save(satoshi);
        UserSpec spec=new UserSpec();
        spec.setId("111");
        spec.setUserId(111);
        spec.setAddress1("Higashikurumeshi");
        spec.setAddress2("3-11-13");
        spec.setCity("Kashiwa");
        spec.setZip("1890012");
        spec.setCountry("Japan");
        spec.setState("Tokyo");
        spec.setBalance(50);
        spec.setCredit(100);
        usrepository.save(spec);

        LocalDateTime now = LocalDateTime.now();
        AssetFlow flo=new AssetFlow("111",111,"111",1500f,"OUT",now.minusWeeks(2));
        afrepository.save(flo);
        AssetFlow flo2=new AssetFlow("222",111,"222",2000f,"OUT",now.minusMonths(2));
        afrepository.save(flo2);
        AssetFlow flo3=new AssetFlow("333",111,"333",200f,"IN",now.minusDays(1));
        afrepository.save(flo3);
        AssetFlow flo4=new AssetFlow("444",111,"444",40f,"IN",now.minusDays(1));
        afrepository.save(flo4);
        Debt debtSubmitted=new Debt("111",111,Status.SUBMITTED);
        Debt debtAccepted=new Debt("222",111,Status.ACCEPTED);
        //debtRepository.save(debtSubmitted);
        //debtRepository.save(debtAccepted);

        FP fp=new FP("111","P&G",3.3360,7,
                "111",1000,"middle",now,"P&G",now,"imdescription");
        fpRepository.save(fp);

        FPDeal fpdeal=new FPDeal("111",111,"111");
        fpdealRepository.save(fpdeal);

        Bankcard card1=new Bankcard("111",111,"4411222233334444","aikawa satoshi","123","0822",now);
        bcRepository.save(card1);
        Bankcard card=new Bankcard("222",111,"3611222233334444","aikawa satoshi","123","1123",now);
        bcRepository.save(card);
        Bankcard card2=new Bankcard("333",111,"6212234567893456","aikawa satoshi","123","1124",now);
        bcRepository.save(card2);


        Integer[] a = new Integer[]{1,2,3};
        List<Integer> lst = Arrays.asList(a);
        Question que1=new Question("111","Will borrowing money help me achieve my goals?","Here’s the most important question to ask before you borrow a single cent: Do I really need this money?"+
                "While taking out a personal loan can make sense in certain circumstances, borrowing won’t solve your financial problems if you don’t have a plan to truly take control of your finances.\n" +
                "\n" +
                "Before you take out a personal loan, take a close look at your financial picture to determine if it’s the right financial tool for your needs.\n" +
                "\n",lst);
        questionRepository.save(que1);
        Question que2=new Question("222","How much do I need to borrow","Once you’ve determined you do need a personal loan, it’s crucial to nail down exactly how much you need to borrow.",lst);
        questionRepository.save(que2);
        Question que3=new Question("333","What will my monthly payment be, and can I afford them?","While personal loans can provide cash for many different needs, it’s important to make sure you only borrow what you can afford to repay. Since your monthly payment is the best way to gauge affordability, it can pay off to explore potential payment options with a loan calculator.",lst);
        questionRepository.save(que3);
        Question que4=new Question("444","How long will I be paying this loan off?","How long you’ll repay your loan is another important question to ask, keeping in mind that this is mostly your decision.If you don’t mind paying a larger monthly payment, you may want to choose a shorter timeline. On the flip side, a loan with a longer repayment timeline can help you secure a smaller, more affordable monthly payment.",lst);
        questionRepository.save(que4);
        Question que5=new Question("555","What is my credit score?","Your credit score may play a role in whether you qualify for a personal loan at all. And, if you qualify, having good credit could help you secure a loan with a lower interest rate and better terms than if you had poorer credit health.",lst);
        questionRepository.save(que5);




    }






    }





//http://books.google.com/books/content?id=oqmBpk1EzvAC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE711QBNtaIUSwWq78rKS255V9UdZGGvCLPHFe71mqh1MU9KhM2TmFFpSYInEoAmDyH43DB7HlgMn2RQD5Ui6zQNPIyNcyEAdDJmGcaBifZjypTM97qrD1I0Mcvq_U2_QW8VW_23J&source=gbs_api