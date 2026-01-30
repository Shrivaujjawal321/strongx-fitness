import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@strongx.com' },
    update: {},
    create: {
      email: 'admin@strongx.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Created admin user:', adminUser.email);

  // Create staff user
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@strongx.com' },
    update: {},
    create: {
      email: 'staff@strongx.com',
      password: await bcrypt.hash('staff123', 12),
      name: 'Staff Member',
      role: 'STAFF',
    },
  });
  console.log('Created staff user:', staffUser.email);

  // Create membership plans
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for beginners starting their fitness journey',
      price: 29,
      duration: 30,
      features: [
        'Access to Gym Equipment',
        'Locker Room Access',
        'Free WiFi',
      ],
    },
    {
      name: 'Premium',
      description: 'Most popular choice for dedicated fitness enthusiasts',
      price: 79,
      duration: 30,
      features: [
        'Access to Gym Equipment',
        'Locker Room Access',
        'Free WiFi',
        'All Group Classes',
        '2 PT Sessions/Month',
        'Swimming Pool',
      ],
    },
    {
      name: 'Elite',
      description: 'Ultimate experience with unlimited access to everything',
      price: 149,
      duration: 30,
      features: [
        'Access to Gym Equipment',
        'Locker Room Access',
        'Free WiFi',
        'All Group Classes',
        'Unlimited PT Sessions',
        'Swimming Pool',
        'Sauna & Spa',
      ],
    },
    {
      name: 'Annual Basic',
      description: 'One year of basic membership at a discounted rate',
      price: 290,
      duration: 365,
      features: [
        'Access to Gym Equipment',
        'Locker Room Access',
        'Free WiFi',
        '2 Free Months',
      ],
    },
    {
      name: 'Annual Premium',
      description: 'One year of premium membership at a discounted rate',
      price: 790,
      duration: 365,
      features: [
        'Access to Gym Equipment',
        'Locker Room Access',
        'Free WiFi',
        'All Group Classes',
        '2 PT Sessions/Month',
        'Swimming Pool',
        '2 Free Months',
      ],
    },
  ];

  for (const plan of plans) {
    await prisma.membershipPlan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan,
    });
  }
  console.log('Created membership plans');

  // Create sample trainers
  const trainers = [
    {
      trainerId: 'TRN-0001',
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@strongx.com',
      phone: '+1-555-0101',
      specialization: ['Strength Training', 'Powerlifting', 'HIIT'],
      certification: ['NASM-CPT', 'CSCS', 'CrossFit Level 2'],
      experience: 8,
      salary: 5000,
      bio: 'Alex is a certified strength and conditioning specialist with over 8 years of experience helping clients achieve their fitness goals.',
    },
    {
      trainerId: 'TRN-0002',
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria.santos@strongx.com',
      phone: '+1-555-0102',
      specialization: ['Yoga', 'Pilates', 'Meditation'],
      certification: ['RYT-500', 'PMA-CPT'],
      experience: 10,
      salary: 4500,
      bio: 'Maria is a yoga master with international certification and over a decade of teaching experience.',
    },
    {
      trainerId: 'TRN-0003',
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@strongx.com',
      phone: '+1-555-0103',
      specialization: ['Kickboxing', 'MMA', 'Boxing'],
      certification: ['USA Boxing Coach', 'MMA Conditioning'],
      experience: 12,
      salary: 5500,
      bio: 'Former professional fighter turned coach, James brings real-world combat sports experience to every session.',
    },
    {
      trainerId: 'TRN-0004',
      firstName: 'Sophie',
      lastName: 'Lee',
      email: 'sophie.lee@strongx.com',
      phone: '+1-555-0104',
      specialization: ['Swimming', 'Aqua Fitness', 'Triathlon'],
      certification: ['ASCA Level 3', 'Lifeguard Certified'],
      experience: 6,
      salary: 4000,
      bio: 'Former competitive swimmer, Sophie specializes in technique improvement and aquatic fitness.',
    },
    {
      trainerId: 'TRN-0005',
      firstName: 'Marcus',
      lastName: 'Brown',
      email: 'marcus.brown@strongx.com',
      phone: '+1-555-0105',
      specialization: ['Group Fitness', 'Dance', 'Spin'],
      certification: ['Les Mills Certified', 'Spinning Instructor'],
      experience: 5,
      salary: 3800,
      bio: 'Marcus brings energy and enthusiasm to every group class, making fitness fun for everyone.',
    },
  ];

  for (const trainer of trainers) {
    await prisma.trainer.upsert({
      where: { email: trainer.email },
      update: trainer,
      create: trainer,
    });
  }
  console.log('Created trainers');

  // Create sample staff
  const staff = [
    {
      staffId: 'STF-0001',
      firstName: 'Jennifer',
      lastName: 'Adams',
      email: 'jennifer.adams@strongx.com',
      phone: '+1-555-0201',
      role: 'Front Desk Manager',
      salary: 3500,
    },
    {
      staffId: 'STF-0002',
      firstName: 'Robert',
      lastName: 'Clark',
      email: 'robert.clark@strongx.com',
      phone: '+1-555-0202',
      role: 'Facilities Manager',
      salary: 4000,
    },
    {
      staffId: 'STF-0003',
      firstName: 'Emily',
      lastName: 'Turner',
      email: 'emily.turner@strongx.com',
      phone: '+1-555-0203',
      role: 'Receptionist',
      salary: 2500,
    },
  ];

  for (const s of staff) {
    await prisma.staff.upsert({
      where: { email: s.email },
      update: s,
      create: s,
    });
  }
  console.log('Created staff members');

  // Create sample members
  const members = [
    {
      memberId: 'SX-0001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-1001',
      gender: 'MALE' as const,
      status: 'ACTIVE' as const,
    },
    {
      memberId: 'SX-0002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      phone: '+1-555-1002',
      gender: 'FEMALE' as const,
      status: 'ACTIVE' as const,
    },
    {
      memberId: 'SX-0003',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '+1-555-1003',
      gender: 'MALE' as const,
      status: 'ACTIVE' as const,
    },
    {
      memberId: 'SX-0004',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@email.com',
      phone: '+1-555-1004',
      gender: 'FEMALE' as const,
      status: 'EXPIRED' as const,
    },
    {
      memberId: 'SX-0005',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@email.com',
      phone: '+1-555-1005',
      gender: 'MALE' as const,
      status: 'ACTIVE' as const,
    },
  ];

  for (const member of members) {
    await prisma.member.upsert({
      where: { email: member.email },
      update: member,
      create: member,
    });
  }
  console.log('Created members');

  // Create memberships for active members
  const createdMembers = await prisma.member.findMany({
    where: { status: 'ACTIVE' },
  });
  const premiumPlan = await prisma.membershipPlan.findFirst({
    where: { name: 'Premium' },
  });

  if (premiumPlan) {
    for (const member of createdMembers) {
      const existingMembership = await prisma.membershipHistory.findFirst({
        where: { memberId: member.id, status: 'ACTIVE' },
      });

      if (!existingMembership) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + premiumPlan.duration);

        await prisma.membershipHistory.create({
          data: {
            memberId: member.id,
            planId: premiumPlan.id,
            startDate,
            endDate,
            status: 'ACTIVE',
          },
        });
      }
    }
  }
  console.log('Created memberships');

  // Create some sample payments
  const paymentMembers = await prisma.member.findMany({ take: 3 });
  let paymentCount = 1;

  for (const member of paymentMembers) {
    const payment = await prisma.payment.create({
      data: {
        paymentId: `PAY-${String(paymentCount).padStart(4, '0')}`,
        memberId: member.id,
        amount: 79,
        paymentMethod: 'CARD',
        status: 'COMPLETED',
        description: 'Premium membership payment',
      },
    });

    await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${String(paymentCount).padStart(4, '0')}`,
        paymentId: payment.id,
      },
    });

    paymentCount++;
  }
  console.log('Created sample payments');

  console.log('Seeding completed successfully!');
  console.log('\nAdmin credentials:');
  console.log('  Email: admin@strongx.com');
  console.log('  Password: admin123');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
